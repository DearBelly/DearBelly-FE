"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { LetterEditBox } from "@/components/TextField/LetterEditBox";
import { Box } from "@chakra-ui/react";
import { TrashSolid } from "@mynaui/icons-react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useLetterDetail, useUpdateLetter, useDeleteLetter } from "@/hooks/useLetters";
import { DeleteModal } from "@/components/Modals/DeleteModal";

export default function EditLetterPage() {
  const router = useRouter();
  const { id: idParam } = useParams<{ id: string }>();
  const id = Number(idParam);

  const searchParams = useSearchParams();
  const qsContent = useMemo(() => searchParams.get("content") ?? "", [searchParams]);

  const { data: detailResp, isLoading: detailLoading } = useLetterDetail(id);
  const detail = detailResp?.data;
  const editable = detail?.editable ?? true;
  const serverContent = detail?.content ?? "";
  const questionText = detail?.question ?? "";

  const [content, setContent] = useState(qsContent || serverContent);
  useEffect(() => {
    if (!qsContent && serverContent) setContent(serverContent);
  }, [qsContent, serverContent]);

  const trimmed = content.trim();

  const { mutate: updateMutate, isPending: updating } = useUpdateLetter();
  const { mutate: deleteMutate, isPending: deleting } = useDeleteLetter();

  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const handleUpdate = useCallback(() => {
    if (!Number.isFinite(id) || !trimmed) return;
    updateMutate(
      { id, content: trimmed },
      { onSuccess: () => router.push("/letters"), onError: (e) => console.log("수정 실패:", e) }
    );
  }, [id, trimmed, updateMutate, router]);

  const requestDelete = useCallback(() => {
    if (!editable) return;
    setDeleteOpen(true); 
  }, [editable]);

  const confirmDelete = useCallback(() => {
    if (!Number.isFinite(id)) return;
    deleteMutate(id, {
      onSuccess: () => router.push("/letters"),
      onError: (e) => console.log("삭제 실패:", e),
    });
  }, [id, deleteMutate, router]);

  const isActionDisabled =
    detailLoading || updating || deleting || !editable || trimmed.length === 0;

  const deleteButton = (
    <Box
      as="button"
      color="text.text1"
      cursor={editable ? "pointer" : "not-allowed"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={requestDelete}     
      aria-disabled={deleting || !editable}
    >
      <TrashSolid size={24} />
    </Box>
  );

  return (
    <TopBarBottomButtonLayout
      topbarTitle="편지함"
      nextLabel="완료"
      topbarRightContent={deleteButton}
      onNext={handleUpdate}
      nextDisabled={isActionDisabled}
      onBack={() => router.back()}
    >
      <Box display="flex" flexDirection="column" mt="20px" w="100%" maxW="35rem" alignItems="center">
        <LetterEditBox value={content} onChange={setContent} questionText={questionText} />
      </Box>

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={confirmDelete}
      />
    </TopBarBottomButtonLayout>
  );
}
