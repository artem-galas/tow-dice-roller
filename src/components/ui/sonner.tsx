import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import {useTheme} from "next-themes"
import {Toaster as Sonner, toast as sonnerToast, type ToasterProps} from "sonner"
import {D10DiceIcon} from "@/components/dice-icon/d10-dice.icon";

function Divider() {
  return <svg width="19" height="80" viewBox="0 0 19 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#394B59" d="M10 0v100H9V0z"></path>
    <path fill="#182026" d="M19 68H0V33h19z"></path>
    <path fill="#394B59" d="M19 57H0v-3h19zM19 47H0v-3h19z"></path>
  </svg>
}

export function toast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      title={toast.title}
      description={toast.description}
      result={toast.result}
    />
  ), {
    dismissible: false,
    duration: 10_000,
  });
}

type ToastProps = {
  id: string | number;
  title: string;
  description: string;
  result: number
}

export function Toast(props: ToastProps) {
  const {result, id, title, description} = props;

  return (
    <div className="flex text-white font-bold bg-[#182026] rounded-[12px] float-left mt-4">
      <div className="min-w-[130px] m-4">
        <div className="uppercase">{title}</div>
        <div className="flex gap-[8px]">
          <span className="inline-block w-[32px]">
            <D10DiceIcon/>
          </span>
          <div className="font-bold overflow-hidden text-2xl max-w-[160px]">
            {description}
          </div>
        </div>
      </div>
      <Divider/>
      <div className="flex flex-col justify-center pl-[10px] pr-[5px] w-[95px]">
        <span className="text-4xl">{result}</span>
      </div>
    </div>
  )
}


const Toaster = ({...props}: ToasterProps) => {
  const {theme = "system"} = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4"/>,
        info: <InfoIcon className="size-4"/>,
        warning: <TriangleAlertIcon className="size-4"/>,
        error: <OctagonXIcon className="size-4"/>,
        loading: <Loader2Icon className="size-4 animate-spin"/>,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export {Toaster}
