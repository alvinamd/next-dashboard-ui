"use server"

import { revalidatePath } from 'next/cache';
import { DocumentSchema, documentSchema } from './formValidationSchemas';
import prisma from './prisma';
import { randomUUID } from 'crypto';

type CurrentState = { success: boolean; error: boolean };

export const createDocuments = async (data:DocumentSchema)=>{
    try {
        await prisma.document.create({
          data: {
            id: randomUUID(),
            title: data.title,
            docType: data.docType,
            yearPublished: data.yearPublished,
          },
        });
    
        revalidatePath("/list/teachers");
        return { success: true, error: false };
      } catch (err) {
        console.log(err);
        return { success: false, error: true };
      }
    };

    export const updateDocument = async (
      currentState: CurrentState,
      data: DocumentSchema
    ) => {
      try {
        if (!data.id) {
          return { success: false, error: true };
        }
        
        await prisma.document.update({
          where: {
            id: data.id,
          },
          data: {
            title: data.title,
            docType: data.docType,
            yearPublished: data.yearPublished,
          },
        });
    
        // revalidatePath("/list/subjects");
        return { success: true, error: false };
      } catch (err) {
        console.log(err);
        return { success: false, error: true };
      }
    };


