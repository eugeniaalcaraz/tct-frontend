import { ApprovalElements } from "@/types";

export const getApprovalName = (name) => {
    switch (name) {
        case ApprovalElements.AviosApprovals:
            return "Avíos";
        case ApprovalElements.ColorsApprovals:
            return "Colores";
        case ApprovalElements.PrintsApprovals:
            return "Estampas";
        case ApprovalElements.QualitiesApprovals:
            return "Calidades";
    }
};
