import MemoForm from '@/components/MemoForm';

export default async function CreateNewMemo({ searchParams }) {
   const params = await searchParams;
   const type = params?.type || 'executive';
   return <MemoForm isNew={true} memoType={type} />;
}
