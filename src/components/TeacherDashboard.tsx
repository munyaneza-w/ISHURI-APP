import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  BarChart3, 
  Plus,
  BookOpen,
  MessageCircle,
  Calendar,
  Clock
} from "lucide-react";

export const TeacherDashboard = () => {
  const myClasses = [
    { id: 1, name: "Mathematics S4A", students: 28, progress: 78 },
    { id: 2, name: "Mathematics S4B", students: 25, progress: 82 },
    { id: 3, name: "Mathematics S5", students: 32, progress: 65 }
  ];

  const recentActivities = [
    { action: "New quiz submitted", student: "Marie Uwimana", time: "2 hours ago" },
    { action: "Question asked", student: "Jean Baptiste", time: "4 hours ago" },
    { action: "Assignment completed", student: "Grace Mukamana", time: "1 day ago" }
  ];

  const pendingTasks = [
    { task: "Grade S4A Quiz #3", count: 15, dueDate: "Today" },
    { task: "Review S5 Assignment", count: 8, dueDate: "Tomorrow" },
    { task: "Prepare S4B Lesson", count: 1, dueDate: "Dec 22" }
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-light to-success-light rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Welcome back, Teacher Mukamuganga!
        </h2>
        <p className="text-muted-foreground mb-4">
          Empower your students with quality education. Your impact matters.
        </p>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Create New Lesson
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-light rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">85</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success-light rounded-lg">
                <FileText className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lessons Created</p>
                <p className="text-2xl font-bold">42</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent-light rounded-lg">
                <BarChart3 className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Class Score</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning-light rounded-lg">
                <MessageCircle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Classes */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                My Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {myClasses.map((classItem) => (
                <div key={classItem.id} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{classItem.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {classItem.students} students enrolled
                      </p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Average Progress: {classItem.progress}%
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Analytics
                      </Button>
                      <Button size="sm">
                        Manage Class
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Pending Tasks & Recent Activity */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.map((task, index) => (
                <div key={index} className="border border-border rounded-lg p-3">
                  <h4 className="font-medium text-sm">{task.task}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">
                      {task.count} items
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {task.dueDate}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-2">
                    Review
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="border-b border-border pb-3 last:border-b-0">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.student}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};