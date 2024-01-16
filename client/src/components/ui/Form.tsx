import { Typography, Button, Card, CardBody, CardHeader, CardFooter } from "@/components/ui";
import { FormSubmitEvent } from "@/types";
import { ReactNode } from "react";

type FormProps = {
   text: { header: string; button: string };
   styles?: { card: string; header: string; body: string; footer: string };
   loading?: boolean;
   onSubmit: (event: FormSubmitEvent) => any;
   renderAfterButton?: JSX.Element;
   children: ReactNode;
};

export const Form = ({
   text = { header: "", button: "" },
   styles = { card: "", header: "", body: "", footer: "" },
   loading = false,
   onSubmit = () => {},
   renderAfterButton,
   children,
   ...formRest
}: FormProps) => {
   return (
      <form onSubmit={onSubmit} {...formRest}>
         <Card
            className={`border-sp bg-gradient mx-auto mb-2 mt-14 w-[650px] max-w-full overflow-x-visible md:mt-32 ${styles.card}`}
         >
            <CardHeader className={styles.header}>
               <Typography color="white" variant="h3" className="text-2xl md:text-3xl">
                  {text.header}
               </Typography>
            </CardHeader>

            <CardBody className={styles.body}>{children}</CardBody>

            {text.button && (
               <CardFooter className={styles.footer}>
                  <Button type="submit" disabled={loading} className="from-teal-400 to-teal-900" fullWidth>
                     {text.button}
                  </Button>
               </CardFooter>
            )}
            {renderAfterButton || ""}
         </Card>
      </form>
   );
};
