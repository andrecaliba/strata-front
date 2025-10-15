import {
  Card,
  CardHeader,
  CardContent
} from "@/components/ui/card";
import {
  Ellipsis
} from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

export default function BoardTasks() {
  return (
    <TabsContent value="board" className="flex gap-4">
      <Card className="min-h-dvh grow-1 shrink-1 basis-0">
        <CardHeader className="flex justify-between">
          To do
          <Ellipsis/>
        </CardHeader>
        <CardContent className="overflow-y-auto h-full">
          <Card className="mb-4">
            <CardHeader>
              <div className="flex text-xs items-center">
                <p>Easy</p>
                <Ellipsis className="ml-auto"/>
              </div>
              <h5 className="font-bold">Practice Live Presentation</h5>
              <p className="text-xs">Pitch your idea with your groupmates in WPH. Flux is the best group in the universe.</p>
              <div className="mt-4">
                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              </div>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>
      <Card className="min-h-dvh grow-1 shrink-1 basis-0">
        <CardHeader className="flex justify-between">
          In Progress
          <Ellipsis/>
        </CardHeader>
        <CardContent className="overflow-y-auto h-full">
          <Card className="mb-4">
            <CardHeader>
              <div className="flex text-xs items-center">
                <p>Easy</p>
                <Ellipsis className="ml-auto"/>
              </div>
              <h5 className="font-bold">Practice Live Presentation</h5>
              <p className="text-xs">Pitch your idea with your groupmates in WPH. Flux is the best group in the universe.</p>
              <div className="mt-4">
                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              </div>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>
      <Card className="min-h-dvh grow-1 shrink-1 basis-0">
        <CardHeader className="flex justify-between">
          For Review
          <Ellipsis/>
        </CardHeader>
        <CardContent className="overflow-y-auto h-full">
          <Card className="mb-4">
            <CardHeader>
              <div className="flex text-xs items-center">
                <p>Easy</p>
                <Ellipsis className="ml-auto"/>
              </div>
              <h5 className="font-bold">Practice Live Presentation</h5>
              <p className="text-xs">Pitch your idea with your groupmates in WPH. Flux is the best group in the universe.</p>
              <div className="mt-4">
                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              </div>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>
      <Card className="min-h-dvh grow-1 shrink-1 basis-0">
        <CardHeader className="flex justify-between">
          Done
          <Ellipsis/>
        </CardHeader>
        <CardContent className="overflow-y-auto h-full">
          <Card className="mb-4">
            <CardHeader>
              <div className="flex text-xs items-center">
                <p>Easy</p>
                <Ellipsis className="ml-auto"/>
              </div>
              <h5 className="font-bold">Practice Live Presentation</h5>
              <p className="text-xs">Pitch your idea with your groupmates in WPH. Flux is the best group in the universe.</p>
              <div className="mt-4">
                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              </div>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>
    </TabsContent>
  );
}