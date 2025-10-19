"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const dateSchema = z.date().refine(date => {
    const year = date.getFullYear();
    return year >= 1900 && year <= 2100;
  }, "Year in date out of valid range.");

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  yearPublished: z.number({ message: "Publication year is required!" })
    .min(1900, { message: "Year must be at least 1900" })
    .max(2100, { message: "Year must be at most 2100" }),
  docType: z.enum(["type 1", "type 2", "type 3", "type 4","type 5", "type 6", "type 7", "type 8"], { message: "Document type is required!" }),
  img: z.instanceof(File, { message: "Sampul is required" }),
});

type Inputs = z.infer<typeof schema>;

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
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

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
        <InputField
          label="Year Published"
          name="yearPublished"
          defaultValue={data?.yearPublished}
          register={register}
          error={errors.yearPublished}
          type="number"
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">docType</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("docType")}
            defaultValue={data?.sex}
        >
            <option value="type 1">type 1</option>
            <option value="type 2">type 2</option>
            <option value="type 3">type 3</option>
            <option value="type 4">type 4</option>
            <option value="type 5">type 5</option>
            <option value="type 6">type 6</option>
            <option value="type 7">type 7</option>
            <option value="type 8">type 8</option>

          </select>
          {errors.docType?.message && (
            <p className="text-xs text-red-400">
              {errors.docType.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload the document cover</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;