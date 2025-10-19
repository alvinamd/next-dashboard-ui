import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role, teachersData } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import FormModal from "@/components/FormModal"
type Teacher = {
  id:number;
  teacherID:string;
  title:string;
  email:string;
  photo:string;
  yearPublished:string;
  subjects:string[];
  classes:string[];
  category:string[];
}

const columns = [
  {
    header:"Title", accessor:"title"
  },
  {
    header:"Year Published", accessor:"year", className: "hidden lg:table-cell"
  },
  {
    header:"Category", accessor:"category", className: "hidden lg:table-cell"
  },
  {
    header:"Actions", accessor:"actions", className: "hidden lg:table-cell"
  }]




const TeacherListPage = () => {

  const renderRow= (item:Teacher) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.title}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.yearPublished}</td>
      <td className="hidden md:table-cell">{item.category}</td>
      <td>
        <div className="flex items-center" gap-2>
          <Link href={'/list/teachers/${item.id}'}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16}/>
            </button>
          </Link>
          <Link href={'/list/teachers/${item.id}'}>
            {role=== "admin" && (
              //<button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple"> <Image src="/delete.png" alt="" width={16} height={16}/> </button>
              <FormModal table="teacher" type="delete" id={item.id}/>
          )}
          </Link>

        </div>
      </td>
    </tr>
  )

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>

      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch/>
        <div className="flex items-center gap-4 self-end">
          <button 
          className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            <Image src="/filter.png" alt="" width={14} height={14}/>
          </button>
          <button 
          className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            <Image src="/sort.png" alt="" width={14} height={14}/>
          </button>
          {role === "admin" && (
            <FormModal table="teacher" type="create"/>
          )}

        </div>
      </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={teachersData}/>
      <Pagination/>

      </div>
  )
}

export default TeacherListPage