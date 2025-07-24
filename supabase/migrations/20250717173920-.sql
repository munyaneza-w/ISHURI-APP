-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'parent', 'admin')),
  grade_level TEXT, -- For students (S1-S6)
  school_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  teacher_id UUID NOT NULL REFERENCES public.profiles(user_id),
  thumbnail_url TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  video_url TEXT,
  audio_url TEXT,
  document_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quizzes table
CREATE TABLE public.quizzes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  time_limit_minutes INTEGER,
  passing_score INTEGER DEFAULT 70,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz questions table
CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'short_answer', 'true_false')),
  options JSONB, -- For multiple choice options
  correct_answer TEXT NOT NULL,
  points INTEGER DEFAULT 1,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz attempts table
CREATE TABLE public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(user_id),
  answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  total_points INTEGER NOT NULL,
  time_taken_minutes INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create student progress table
CREATE TABLE public.student_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.profiles(user_id),
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  time_spent_minutes INTEGER DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, lesson_id)
);

-- Create discussion forums table
CREATE TABLE public.discussion_forums (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES public.profiles(user_id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create forum posts table
CREATE TABLE public.forum_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  forum_id UUID NOT NULL REFERENCES public.discussion_forums(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.profiles(user_id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  parent_post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_forums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Authenticated users can view profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
-- Note: Profile creation is primarily handled by the `handle_new_user` trigger.
-- This policy is a fallback and allows manual insertion if needed.
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for courses
CREATE POLICY "Anyone can view published courses" ON public.courses FOR SELECT USING (is_published = true OR teacher_id = auth.uid());
CREATE POLICY "Teachers can create their own courses" ON public.courses FOR INSERT WITH CHECK (
  (SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'teacher' AND teacher_id = auth.uid()
);
CREATE POLICY "Teachers can update their own courses" ON public.courses FOR UPDATE USING (teacher_id = auth.uid());
CREATE POLICY "Teachers can delete their own courses" ON public.courses FOR DELETE USING (teacher_id = auth.uid());

-- RLS Policies for lessons
CREATE POLICY "Users can view lessons of published courses" ON public.lessons FOR SELECT USING (
  course_id IN (SELECT id FROM public.courses WHERE is_published = true OR teacher_id = auth.uid())
);
CREATE POLICY "Teachers can manage lessons for their courses" ON public.lessons FOR ALL USING (
  course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
);

-- RLS Policies for quizzes
CREATE POLICY "Users can view published quizzes" ON public.quizzes FOR SELECT USING (
  is_published = true OR course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
);
CREATE POLICY "Teachers can manage quizzes for their courses" ON public.quizzes FOR ALL USING (
  course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
);

-- RLS Policies for quiz questions
CREATE POLICY "Users can view questions of accessible quizzes" ON public.quiz_questions FOR SELECT USING (
  quiz_id IN (SELECT id FROM public.quizzes WHERE is_published = true OR course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid()))
);
CREATE POLICY "Teachers can manage questions for their quizzes" ON public.quiz_questions FOR ALL USING (
  quiz_id IN (SELECT q.id FROM public.quizzes q JOIN public.courses c ON q.course_id = c.id WHERE c.teacher_id = auth.uid())
);

-- RLS Policies for quiz attempts
CREATE POLICY "Students can view their own attempts" ON public.quiz_attempts FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Students can create their own attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "Teachers can view attempts for their courses" ON public.quiz_attempts FOR SELECT USING (
  quiz_id IN (SELECT q.id FROM public.quizzes q JOIN public.courses c ON q.course_id = c.id WHERE c.teacher_id = auth.uid())
);

-- RLS Policies for student progress
CREATE POLICY "Students can view their own progress" ON public.student_progress FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Students can insert their own progress" ON public.student_progress FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "Students can update their own progress" ON public.student_progress FOR UPDATE USING (student_id = auth.uid());
CREATE POLICY "Teachers can view progress for their courses" ON public.student_progress FOR SELECT USING (
  course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
);

-- RLS Policies for discussion forums
CREATE POLICY "Users can view forums for accessible courses" ON public.discussion_forums FOR SELECT USING (
  course_id IN (SELECT id FROM public.courses WHERE is_published = true OR teacher_id = auth.uid())
);
CREATE POLICY "Teachers can manage forums for their courses" ON public.discussion_forums FOR ALL USING (
  course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
);

-- RLS Policies for forum posts
CREATE POLICY "Users can view posts in accessible forums" ON public.forum_posts FOR SELECT USING (
  forum_id IN (SELECT f.id FROM public.discussion_forums f JOIN public.courses c ON f.course_id = c.id WHERE c.is_published = true OR c.teacher_id = auth.uid())
);
CREATE POLICY "Users can create posts in accessible forums" ON public.forum_posts FOR INSERT WITH CHECK (
  auth.uid() = author_id AND forum_id IN (SELECT f.id FROM public.discussion_forums f JOIN public.courses c ON f.course_id = c.id WHERE c.is_published = true OR c.teacher_id = auth.uid())
);
CREATE POLICY "Users can update their own posts" ON public.forum_posts FOR UPDATE USING (author_id = auth.uid());
CREATE POLICY "Users can delete their own posts" ON public.forum_posts FOR DELETE USING (author_id = auth.uid());

-- Create a function to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role, school_name, grade_level, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'), -- Fallback for full_name
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'), -- Default role to 'student'
    NEW.raw_user_meta_data->>'school_name',
    NEW.raw_user_meta_data->>'grade_level',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; -- SECURITY DEFINER is required to allow this function to write to the public.profiles table.

COMMENT ON FUNCTION public.handle_new_user() IS 'Triggered by auth.users; creates a new profile for each new user.';

-- Create a trigger to execute the function after a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON public.quizzes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON public.forum_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_courses_teacher_id ON public.courses(teacher_id);
CREATE INDEX idx_courses_grade_level ON public.courses(grade_level);
CREATE INDEX idx_lessons_course_id ON public.lessons(course_id);
CREATE INDEX idx_quizzes_course_id ON public.quizzes(course_id);
CREATE INDEX idx_quiz_questions_quiz_id ON public.quiz_questions(quiz_id);
CREATE INDEX idx_quiz_attempts_student_id ON public.quiz_attempts(student_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON public.quiz_attempts(quiz_id);
CREATE INDEX idx_student_progress_student_id ON public.student_progress(student_id);
CREATE INDEX idx_student_progress_course_id ON public.student_progress(course_id);
CREATE INDEX idx_forum_posts_forum_id ON public.forum_posts(forum_id);
CREATE INDEX idx_forum_posts_author_id ON public.forum_posts(author_id);