import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Ellipsis } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { useGetTasks } from "@/hooks/use-task";
import { useMemo } from "react";
import { Task } from "@/types/dataInterface";

export default function BoardTasks() {
  const { data: tasks = [], isLoading } = useGetTasks();

  const tasksByStatus = useMemo(() => {
    return {
      "To Do": tasks.filter((task: Task) => task.status === "To Do"),
      "In Progress": tasks.filter(
        (task: Task) => task.status === "In Progress"
      ),
      "For Review": tasks.filter((task: Task) => task.status === "For Review"),
      Completed: tasks.filter((task: Task) => task.status === "Completed"),
    };
  }, [tasks]);

  const getDifficultyColor = (difficulty: string) =>
    ({
      Easy: "text-[#219653]",
      Moderate: "text-[#F2994A]",
      Hard: "text-[#EB5757]",
    }[difficulty] || "text-[#828282]");

  if (isLoading) {
    return (
      <TabsContent value="list">
        <Card className="bg-white border w-full border-[#D9D9D9] rounded-lg p-8">
          <p className="text-center text-gray-500">Loading tasks...</p>
        </Card>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="board" className="flex gap-4">
      <Card className="min-h-dvh grow-1 shrink-1 basis-0">
        <CardHeader className="flex justify-between">
          To do
          <Ellipsis />
        </CardHeader>
        <CardContent className="overflow-y-auto h-full">
          {tasksByStatus["To Do"].map((task: Task) => (
            <Card key={task.task_id} className="mb-4">
              <CardHeader>
                <div className="flex text-xs items-center">
                  <p className={getDifficultyColor(task.difficulty)}>
                    {task.difficulty}
                  </p>
                  <Ellipsis className="ml-auto" />
                </div>
                <h5 className="font-bold">{task.title}</h5>
                <p className="text-xs">{task.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center -space-x-2">
                    {task.assignees.map((assignee) => (
                      <div key={assignee.user_id} className="mt-4">
                        <div className="w-8 h-8 bg-gray-400 rounded-full text-center text-xs text-white align-middle flex items-center justify-center">
                          <p> {assignee.first_name.charAt(0)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
      <Card className="min-h-dvh grow-1 shrink-1 basis-0">
        <CardHeader className="flex justify-between">
          In Progress
          <Ellipsis />
        </CardHeader>
        <CardContent className="overflow-y-auto h-full">
          {tasksByStatus["In Progress"].map((task: Task) => (
            <Card key={task.task_id} className="mb-4">
              <CardHeader>
                <div className="flex text-xs items-center">
                  <p className={getDifficultyColor(task.difficulty)}>
                    {task.difficulty}
                  </p>
                  <Ellipsis className="ml-auto" />
                </div>
                <h5 className="font-bold">{task.title}</h5>
                <p className="text-xs">{task.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center -space-x-2">
                    {task.assignees.map((assignee) => (
                      <div key={assignee.user_id} className="mt-4">
                        <div className="w-8 h-8 bg-gray-400 rounded-full text-center text-xs text-white align-middle flex items-center justify-center">
                          <p> {assignee.first_name.charAt(0)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
      <Card className="min-h-dvh grow-1 shrink-1 basis-0">
        <CardHeader className="flex justify-between">
          For Review
          <Ellipsis />
        </CardHeader>
        <CardContent className="overflow-y-auto h-full">
          {tasksByStatus["For Review"].map((task: Task) => (
            <Card key={task.task_id} className="mb-4">
              <CardHeader>
                <div className="flex text-xs items-center">
                  <p className={getDifficultyColor(task.difficulty)}>
                    {task.difficulty}
                  </p>
                  <Ellipsis className="ml-auto" />
                </div>
                <h5 className="font-bold">{task.title}</h5>
                <p className="text-xs">{task.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center -space-x-2">
                    {task.assignees.map((assignee) => (
                      <div key={assignee.user_id} className="mt-4">
                        <div className="w-8 h-8 bg-gray-400 rounded-full text-center text-xs text-white align-middle flex items-center justify-center">
                          <p> {assignee.first_name.charAt(0)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
      <Card className="min-h-dvh grow-1 shrink-1 basis-0">
        <CardHeader className="flex justify-between">
          Done
          <Ellipsis />
        </CardHeader>
        <CardContent className="overflow-y-auto h-full">
          {tasksByStatus["Completed"].map((task: Task) => (
            <Card key={task.task_id} className="mb-4">
              <CardHeader>
                <div className="flex text-xs items-center">
                  <p className={getDifficultyColor(task.difficulty)}>
                    {task.difficulty}
                  </p>
                  <Ellipsis className="ml-auto" />
                </div>
                <h5 className="font-bold">{task.title}</h5>
                <p className="text-xs">{task.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center -space-x-2">
                    {task.assignees.map((assignee) => (
                      <div key={assignee.user_id} className="mt-4">
                        <div className="w-8 h-8 bg-gray-400 rounded-full text-center text-xs text-white align-middle flex items-center justify-center">
                          <p> {assignee.first_name.charAt(0)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
