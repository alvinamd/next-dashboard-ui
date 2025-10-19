"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { createDocuments, updateDocument } from "@/lib/actions";
import { documentSchema } from "@/lib/formValidationSchemas";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const dateSchema = z.date().refine(date => {
    const year = date.getFullYear();
    return year >= 1900 && year <= 2100;
  }, "Year in date out of valid range.");


type Inputs = z.infer<typeof documentSchema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(documentSchema),
  });

  const router = useRouter();

  const [state, formAction] = useFormState(type === "create" ? createDocuments : updateDocument,
    {
      success: false,
      error: false,
    }
  );

  const [img, setImg] = useState<any>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    createDocuments(data)
  });

  useEffect(() => {
    if (state.success) {
      toast(`Teacher has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);


  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new document</h1>
      <span className="text-xs text-gray-400 font-medium">
        Document Information Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Year Published</label>
          <input
            type="number"
            {...register("yearPublished", { valueAsNumber: true })}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.yearPublished}
          />
          {errors.yearPublished?.message && (
            <p className="text-xs text-red-400">
              {errors.yearPublished.message.toString()}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">docType</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("docType")}
            defaultValue={"TYPE1"}
        >
            <option value="TYPE1">type 1</option>
            <option value="TYPE2">type 2</option>
            <option value="TYPE3">type 3</option>
            <option value="TYPE4">type 4</option>
            <option value="TYPE5">type 5</option>
            <option value="TYPE6">type 6</option>
            <option value="TYPE7">type 7</option>
            <option value="TYPE8">type 8</option>
          </select>
          {errors.docType?.message && (
            <p className="text-xs text-red-400">
              {errors.docType.message.toString()}
            </p>
          )}
        </div>
          <CldUploadWidget 
            uploadPreset="TMJ BO"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer " onClick={() => open()}
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload the document cover</span>
          </div>
              );
            }}
          </CldUploadWidget>
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;