import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { role, teachersData } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import FormModal from "@/components/FormModal"
import prisma from "@/lib/prisma";
import { Prisma} from "@prisma/client";
import { Document } from "@/generated/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings"

type DocumentData = {
  id: string;
  title: string;
  yearPublished: number;
  docType: string;
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

  const renderRow= (item:DocumentData) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.title}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.yearPublished}</td>
      <td className="hidden md:table-cell">{item.docType}</td>
      <td>
        <div className="flex items-center" gap-5>
          <Link href={'/list/teachers/${item.id}'}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky" title="View document">
              <Image src="/view.png" alt="View" width={14} height={14}/>
            </button>
          </Link>
          <Link href={'/list/teachers/${item.id}'}>
            {role=== "admin" && (
              //<button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple"> <Image src="/delete.png" alt="" width={16} height={16}/> </button>
              <FormModal table="teacher" type="delete" id={parseInt(item.id.replace('document', ''))}/>
          )}
          </Link>

        </div>
      </td>
    </tr>
  )


const TeacherListPage = async ({
  searchParams
}: {
  searchParams:{[key:string]:string} | undefined;
} ) => {

  const {page, ...queryParams} = searchParams || {}
  const p = page ? parseInt(page) : 1;

  const query: Prisma.DocumentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          case "docType":
            query.docType = value as any;
            break;
          case "yearPublished":
            query.yearPublished = parseInt(value);
            break;
          default:
            break;
        }
      }
    }
  }


  const [data,count] = await prisma.$transaction([

  prisma.document.findMany({
      where: query,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE*(p-1),
      orderBy: {
        createdAt: 'desc'
      }
    }),

  prisma.document.count({
      where: query
    }),

  ]);

  console.log(searchParams)

  // Fetch documents from database
  

  


  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>

      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Documents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch/>
        <div className="flex items-center gap-4 self-end">
          <button 
          className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow" title="Filter documents">
            <Image src="/filter.png" alt="Filter" width={14} height={14}/>
          </button>
          <button 
          className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow" title="Sort documents">
            <Image src="/sort.png" alt="Sort" width={14} height={14}/>
          </button>
          {role === "admin" && (
            <FormModal table="teacher" type="create"/>
          )}

        </div>
      </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data}/>
      <Pagination page={p} count={count}/>

      </div>
  )
}

export default TeacherListPage