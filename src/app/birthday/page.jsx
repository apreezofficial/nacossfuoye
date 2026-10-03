import BirthdayForm from '@/components/BirthdayForm';

export default function StudentBirthdayPage() {
   return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
         <BirthdayForm templateType="outsiders" backLink="/" />
      </main>
   );
}
