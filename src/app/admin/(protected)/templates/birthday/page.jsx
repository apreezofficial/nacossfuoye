import BirthdayForm from '@/components/BirthdayForm';

export default async function BirthdayTemplateEditorPage({ searchParams }) {
   const params = await searchParams;
   const type = params?.type || 'executive';
   return <BirthdayForm templateType={type} />;
}
