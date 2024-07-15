import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import FilterDialog from "./FilterDialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const FilterAndSearchField = () => {
  return (
    <div className=" col-span-1 p-4 h-full md:sticky top-0">
      <div className="md:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Filter</Button>
          </DialogTrigger>
          <DialogContent className="sm:container h-[400px]  overflow-y-auto md:hidden ">
            <DialogTitle></DialogTitle>
            <FilterDialog />
          </DialogContent>
        </Dialog>
      </div>
      <div className="hidden md:block">
        <FilterDialog />
      </div>
    </div>
  );
};

export default FilterAndSearchField;
