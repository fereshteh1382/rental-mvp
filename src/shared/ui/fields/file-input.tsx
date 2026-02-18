import * as React from "react"
//import { cn } from "../../../lib/utils"
//import { Trash2Icon, FileIcon } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "../fields/dialog";

type FileInputProps = {
  value?: File[]
  onChange?: (files: File[]) => void
  multiple?: boolean
  accept?: string
  maxSizeMB?: number
  description?: string
}

export function FileInput({
  value = [],
  onChange,
  multiple,
  accept,
  maxSizeMB = 5,
  

}: FileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleFiles(files: FileList | null) {
    if (!files) return

    const fileArray = Array.from(files)

    // اعتبارسنجی حجم
    /*const validFiles = fileArray.filter((file) => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`حجم فایل ${file.name} بیشتر از ${maxSizeMB}MB است`)
        return false
      }
      return true
    })*/

    onChange?.(multiple ? [...value, ...fileArray] : fileArray)
  }

  function removeFile(index: number) {
    const newFiles = [...value]
    newFiles.splice(index, 1)
    onChange?.(newFiles)
  }

  return (
    <div className="space-y-2">
      {/* input hidden */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple={multiple}
        accept={accept}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm",
          "hover:bg-accent transition flex items-center justify-between"
        )}
      >
        <span>انتخاب فایل</span>
        <FileIcon className="size-4 opacity-70" />
      </button>

 

      {/* preview list */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((file, index) => {
            const isImage = file.type.startsWith("image/")
            const previewUrl = isImage ? URL.createObjectURL(file) : null

            return (
              <div key={file.name + index} className="relative w-20 h-20 border rounded-md overflow-hidden">
                {isImage ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <img
                        src={previewUrl!}
                        alt={file.name}
                        className="object-cover w-full h-full cursor-pointer"
                        onLoad={() => URL.revokeObjectURL(previewUrl!)}
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[80vh] p-0">
                      <img src={previewUrl!} alt={file.name} className="w-full h-auto" />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-100 text-xs text-gray-600">
                    {file.name}
                  </div>
                )}
  
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 text-red-700 bg-white/50 rounded-full p-1 hover:bg-white/70"
                >
  <Trash2Icon size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}
