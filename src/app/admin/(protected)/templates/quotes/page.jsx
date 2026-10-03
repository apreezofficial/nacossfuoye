import QuotesForm from '@/components/QuotesForm';

export default async function QuotesTemplateEditorPage({ searchParams }) {
   const params = await searchParams;
   const type = params?.type || 'dyk';
   return <QuotesForm templateType={type} />;
}
