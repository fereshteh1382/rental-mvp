
import { FormBuilder } from "../shared/ui/form-builder";
//import { registerButtonHandler } from "../shared/utils/buttonHandlers";

export default function MyRequests2() {

  const schema = {

    title: "فرم اطلاعات کارمند",
    fields: [
      {
        type: "alert",
        name:"alrt",
        message: "لطفاً همه فیلدهای ضروری را پر کنید",
        severity: "success",
        variant:"outlined",
        color:"error"
      },
      {
        type: "button",
        name: "btn1",
        label: "عنوان دکمه",
        fullWidth: false,       
        variant: "contained",
        color: "info",
        size : "small",
        ontype:"button",
        onClick:"showAlert" //نام تابع خودتان که در پایین همین صفحه تعریف میکنید
      },
      {
        type: "text",
        name: "fName",
        label: "نام",
        required: true,
        min: 3,
        placeholder: "placeholder",
        description: "حداقل 3 کاراکتر وارد نمایید."
      },
      {
        type: "text",
        name: "lName",
        label: " نام خانوادگی",
        required: true,
        min: 3,
        placeholder: "placeholder",
        description: "حداقل 3 کاراکتر وارد نمایید."
      },
      {
        type: "email",
        name: "email",
        label: "ایمیل",
        required: false,
        description: "",

      },
      {
        type: "number",
        name: "tel",
        label: "شماره تماس",
        required: true,
        description: "",
        placeholder: "placeholder",
        max: 10

      },

      {
        type: "password",
        name: "password",
        label: " رمز",
        required: true,
        description: "رمز را وارد نمایید",
        min: 6,
        placeholder: "placeholder",

      },
      /* {
         type: "boolean",
         name: "degree",
         label: "مدرک کارشناسی دارم",
         required: false,
         description: "test..."
       },*/
      {
        type: "select",
        name: "gender",
        label: "جنسیت",
        required: true,
        description: "",
        multiple: false,
        placeholder: "انتخاب کنید",
        options: [
          { label: "مرد", value: "male" },
          { label: "زن", value: "female" },
        ],
      },
      {
        type: "select",
        name: "city",
        label: "شهر",
        required: false,
        description: "",
        multiple: true,
        placeholder: "انتخاب کنید",
        options: [
          { label: "مشهد", value: "mashhad" },
          { label: "تهران", value: "tehran" },
          { label: "ساری", value: "sari" },
          { label: "شیراز", value: "shiraz" },
          { label: "اصفهان", value: "esfehan" },
        ],
      },
      {
        name: "description",
        type: "textarea",
        label: "توضیحات",
        placeholder: "متن توضیحات را وارد کنید",
        required: true,
        description: "حداقل ۲۰ کاراکتر",
        ui: {
          autoSize: true,
          minRows: 3,
          maxRows: 8,
        }
      }, 
      {
        type: "radio",
        name: "status",
        label: "وضعیت",
        required: true,
        description: "",
        options: [
          { label: "متاهل", value: "marrid" },
          { label: "مجرد", value: "single" },
        ],
      },
        
      {
        type: "miladidate",
        name: "birthDate",
        label: "تاریخ (میلادی)",
        required: true,
        calendar: "gregorian",
        description: "",
      },
      {
        type: "solardate",
        name: "birthDateFa",
        label: "تاریخ (شمسی)",
        calendar: "jalali",
        description: "",
      }, 
      
      {
        type: "array",
        name: "degree",
        label: "سوابق تحصیلی",

        items: [
          {
            type: "text",
            name: "Educational-Level",
            label: "مقطع تحصیلی",
            placeholder: "مقطع تحصیلی",
            required: false,

          },
          {
            type: "text",
            name: "Field-Study",
            label: "رشته تحصیلی",
            placeholder: "رشته تحصیلی",
            required: true,
          },
          {
            type: "select",
            name: "University",
            label: "دانشگاه",
            required: true,
            options: [
              { label: "فردوسی مشهد", value: "ferdowsi" },
              { label: "شهید بهشتی", value: "beheshti" },
              { label: "دانشگاه شریف ", value: "sharif" },
              { label: "دانشگاه حکیم سبزواری ", value: "hakim" },
            ],
          },
        ],
      },
      {
        type: "file",
        name: "resume",
        label: "رزومه",
        required: true,
        description: "فایل رزومه را با فرمت PDF یا Word آپلود کنید (حداکثر ۵ مگابایت)",
        accept: ".pdf,.doc,.docx",
        maxSizeMB: 5
      },

      {
        type: "file",
        name: "certificates",
        label: "گواهینامه‌ها",
        multiple: true,
        description: "image-MultiFile",
        maxSizeMB: 5,
        accept: "image/*"
      },
      {
        type: "button",
        name: "send",
        label: "ثبت ",
        fullWidth: false,       
        variant: "contained",
        color: "success",
        size : "small",
        ontype:"submit",
        onClick:""
      },

    ],
  };

  const handleSubmit = (data: any) => {
    console.log("RESULT:", data);
  };
  
  return <FormBuilder schema={schema} onSubmit={handleSubmit} />;
}
