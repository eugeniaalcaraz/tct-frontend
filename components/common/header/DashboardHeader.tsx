import React, { useEffect, useCallback } from "react";
import { Dropdown } from "@/components/common";
import { DashboardContainer } from "./HeaderStyles";
import { useAppSelector, useAppDispatch } from "@/state/app/hooks";
import { OptionsType } from "@/types";
import { handleProductData } from "@/state/features/product";
import { getListingFilters } from "@/services/ProductRequests";
import { handleDashboardData } from "@/state/features";

const DashboardHeader = () => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const { temporada } = useAppSelector((state) => state.dashboard);
    const { allSeasons } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    const handleSeasons = useCallback(async () => {
        dispatch(
            handleProductData({
                allSeasons: await getListingFilters({
                    card: "allSeasons",
                    idMerchant,
                }),
            })
        );
    }, [allSeasons]);

    const handleSelectedSeason = () => {
        if (allSeasons) {
            dispatch(
                handleDashboardData({
                    name: "temporada",
                    value: allSeasons[0].IdSeason,
                })
            );
        }
    };

    useEffect(() => {
        allSeasons === null && handleSeasons();
        allSeasons && temporada === "" && handleSelectedSeason();
    }, [allSeasons, temporada]);

    return (
        <DashboardContainer>
            <Dropdown
                value={String(temporada)}
                label="Temporada"
                options={
                    allSeasons?.map(
                        ({ IdSeason, SeasonName }): OptionsType => ({
                            Id: String(IdSeason),
                            Description: SeasonName,
                        })
                    ) ?? []
                }
                multipleSelect={false}
                variant="dashboard"
            />
        </DashboardContainer>
    );
};

export default DashboardHeader;
