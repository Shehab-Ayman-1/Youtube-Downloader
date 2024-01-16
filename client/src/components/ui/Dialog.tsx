import { Dialog, DialogBody, DialogHeader, Typography, DialogFooter } from "@material-tailwind/react";
import { Button } from "@/components/ui";
import { ReactNode } from "react";

type DialogProps = {
   text: { header: string; button: string };
   open: boolean;
   loading: boolean;
   size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
   handler: () => void;
   onSubmit: () => void;
   children: ReactNode;
};

export const MTDialog = ({
   text = { header: "", button: "" },
   open = false,
   loading = false,
   size = "md",
   handler,
   onSubmit,
   children,
}: DialogProps) => {
   return (
      <Dialog
         open={open}
         size={size}
         placeholder="menu"
         handler={handler}
         className="bg-gradient max-h-[80vh] overflow-y-auto shadow-sp"
      >
         <DialogHeader placeholder="menu-header" className="flex-between">
            <Typography placeholder="menu-title" variant="h3" color="teal">
               {text.header}
            </Typography>
            <i className="fa fa-times text-2xl" onClick={() => handler()} />
         </DialogHeader>

         <DialogBody placeholder="menu-body">{children}</DialogBody>

         <DialogFooter placeholder="menu-footer">
            <Button disabled={loading} fullWidth onClick={onSubmit}>
               {text.button}
            </Button>
         </DialogFooter>
      </Dialog>
   );
};
