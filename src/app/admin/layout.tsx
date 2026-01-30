import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
     
      <AdminSidebar />
      
 
      <div className="flex-1 md:ml-64"> 
       
        <main className="p-4 md:p-8 pt-24"> 
          {children}
        </main>
      </div>
    </div>
  )
}