"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import Icon, { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type CourseProgressButtonProps = {
  chapterId: string;
  courseId: string;
  nextChapterId: string;
  isCompleted: boolean;
};

export const CourseProgressButton = ({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoding] = useState(false);

  const onClick = async () => {
    try {
      setIsLoding(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );
      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Progress updated");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoding(false);
    }
  };
  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};
