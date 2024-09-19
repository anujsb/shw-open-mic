import React, { useState, useEffect } from "react";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/utils/api";
import { FaEdit } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "~/hooks/use-toast";

const OpenMicBot = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("+");
  const [systemPrompt, setSystemPrompt] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [originalPrompt, setOriginalPrompt] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const { data: contextData, isLoading: isContextLoading } =
    api.organization.getContext.useQuery();
  const { mutate: saveContext, isPending: isSaveContextLoading } =
    api.organization.addContext.useMutation({
      onSuccess: () => {
        toast({
          title: "Context Saved",
          description: "Your system prompt has been updated successfully.",
        });
        setIsEditing(false);
        setOriginalPrompt(systemPrompt);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to save context: ${error.message}`,
          variant: "destructive",
        });
      },
    });
  const { mutate: makeCall, isPending: isMakeCallLoading } =
    api.livekit.makeCall.useMutation({
      onSuccess: () => {
        toast({
          title: "Call Initiated",
          description: "Your test call has been sent successfully.",
        });
        setIsDialogOpen(false);
        setPhoneNumber("+");
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to make call: ${error.message}`,
          variant: "destructive",
        });
      },
    });

  useEffect(() => {
    if (contextData?.context) {
      setSystemPrompt(contextData.context);
      setOriginalPrompt(contextData.context);
    } else {
      setIsEditing(true);
    }
  }, [contextData]);

  const handleCall = () => {
    if (isValidPhoneNumber(phoneNumber)) {
      makeCall({ phoneNumber });
    } else {
      toast({
        title: "Invalid Phone Number",
        description:
          "Please enter a valid phone number (min 10 digits with + prefix).",
        variant: "destructive",
      });
    }
  };

  const isValidPhoneNumber = (number: string) => {
    const phoneRegex = /^\+[1-9]\d{9,14}$/;
    return phoneRegex.test(number);
  };

  const handleSaveContext = () => {
    if (systemPrompt.length < 10) {
      toast({
        title: "Error",
        description: "System prompt must be at least 10 characters long.",
        variant: "destructive",
      });
      return;
    }
    saveContext({ context: systemPrompt });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setSystemPrompt(originalPrompt);
    setIsEditing(false);
  };

  return (
    <div className="grid h-screen w-full grid-flow-col grid-cols-4 gap-2">
      <div className="col-span-4 mr-4 mt-20 space-y-4 rounded-lg p-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 rounded-lg border bg-white">
          <CardTitle className="text-2xl font-bold">OpenMic Bot</CardTitle>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div className="relative flex flex-row gap-4">
                <div className="customAnimation customAnimation1 flex h-full items-center justify-center rounded-full bg-black px-6 py-3 shadow-lg hover:cursor-pointer">
                  <BiSolidPhoneCall size="24" color="#F76185" />
                  <span className="ml-2 text-base text-white">Test Call</span>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Make a Test Call</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="font-poppins col-span-3"
                    placeholder="Enter phone number"
                  />
                  <Button
                    onClick={handleCall}
                    className="col-span-1"
                    disabled={isMakeCallLoading}
                  >
                    {isMakeCallLoading ? (
                      <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
                    ) : (
                      "Call"
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="rounded-lg border bg-white p-4">
          <Tabs defaultValue="basics">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger
                value="basics"
                className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-foreground data-[state=active]:border-primary"
              >
                Basics
              </TabsTrigger>
            </TabsList>
            <div className="flex flex-row justify-end">
              <div className="flex gap-2">
                <div
                  className="flex cursor-pointer flex-row gap-2 rounded-md border bg-[#7D4FCF] p-3"
                  onClick={handleEdit}
                >
                  <FaEdit color="white" />
                </div>
              </div>
            </div>
            <TabsContent value="basics" className="p-4">
              <div className="space-y-4 rounded-lg border bg-[#FAFAFA] p-2">
                <h3 className="">System Prompt</h3>

                {isContextLoading ? (
                  <div className="flex justify-center">
                    <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin text-[#7D4FCF]" />
                  </div>
                ) : (
                  <Textarea
                    placeholder="Your job is to collect the user's email address. Ask the user for his email address."
                    className="min-h-[300px] bg-white"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    disabled={!isEditing}
                  />
                )}

                {isEditing && (
                  <div className="flex justify-end space-x-2">
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="relative"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveContext}
                      disabled={isSaveContextLoading}
                      className="relative"
                    >
                      {isSaveContextLoading ? (
                        <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin text-white" />
                      ) : (
                        "Save Context"
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </div>
    </div>
  );
};

export default OpenMicBot;
