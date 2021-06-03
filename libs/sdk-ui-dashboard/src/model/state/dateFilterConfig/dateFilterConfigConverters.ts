// (C) 2019-2021 GoodData Corporation
import groupBy from "lodash/groupBy";
import isEmpty from "lodash/isEmpty";
import min from "lodash/min";
import max from "lodash/max";
import format from "date-fns/format";
import startOfDay from "date-fns/startOfDay";
import subMonths from "date-fns/subMonths";
import {
    IAllTimeDateFilterOption,
    IRelativeDateFilterForm,
    IAbsoluteDateFilterForm,
    IAbsoluteDateFilterPreset,
    IRelativeDateFilterPreset,
    IDateFilterConfig,
} from "@gooddata/sdk-backend-spi";
import {
    IUiAbsoluteDateFilterForm,
    IUiRelativeDateFilterForm,
    DateFilterRelativeOptionGroup,
    IDateFilterOptionsByType,
    RelativeDateFilterOption,
    AbsoluteDateFilterOption,
} from "@gooddata/sdk-ui-filters";
import { PLATFORM_DATE_FORMAT } from "@gooddata/sdk-ui-ext/esm/internal";

export function convertDateFilterConfigToDateFilterOptions(
    config: IDateFilterConfig,
): IDateFilterOptionsByType {
    const allTime = convertAllTime(config.allTime);
    const absoluteForm = convertAbsoluteForm(config.absoluteForm);
    const relativeForm = convertRelativeForm(config.relativeForm);
    const absolutePreset = convertAbsolutePresets(config.absolutePresets);
    const relativePreset = convertRelativePresets(config.relativePresets);

    return removeEmptyKeysFromDateFilterOptions({
        allTime,
        absoluteForm,
        absolutePreset,
        relativeForm,
        relativePreset,
    });
}

function convertAllTime(filter: IAllTimeDateFilterOption | undefined): IAllTimeDateFilterOption | undefined {
    return (
        filter && {
            ...filter,
            type: "allTime",
        }
    );
}

function convertAbsoluteForm(
    filter: IAbsoluteDateFilterForm | undefined,
): IUiAbsoluteDateFilterForm | undefined {
    return (
        filter && {
            ...filter,
            from: format(startOfDay(subMonths(new Date(), 1)), PLATFORM_DATE_FORMAT),
            to: format(startOfDay(new Date()), PLATFORM_DATE_FORMAT),
            type: "absoluteForm",
        }
    );
}

function convertRelativeForm(
    filter: IRelativeDateFilterForm | undefined,
): IUiRelativeDateFilterForm | undefined {
    return (
        filter && {
            from: undefined,
            // we order the granularities anyway, this lets the user to config the default
            granularity: filter.availableGranularities[0],
            localIdentifier: filter.localIdentifier,
            name: filter.name,
            to: undefined,
            type: "relativeForm",
            visible: filter.visible,
        }
    );
}

function convertAbsolutePresets(
    filters: IAbsoluteDateFilterPreset[] | undefined,
): IAbsoluteDateFilterPreset[] | undefined {
    return (
        filters &&
        filters.map(
            (preset): IAbsoluteDateFilterPreset =>
                sanitizeDateFilterOption({
                    ...preset,
                    type: "absolutePreset",
                }),
        )
    );
}

function convertRelativePresets(
    filters: IRelativeDateFilterPreset[] | undefined,
): DateFilterRelativeOptionGroup | undefined {
    return (
        filters &&
        groupBy(
            filters.map(
                (preset): IRelativeDateFilterPreset =>
                    sanitizeDateFilterOption({
                        ...preset,
                        type: "relativePreset",
                    }),
            ),
            (preset) => preset.granularity,
        )
    );
}

function removeEmptyKeysFromDateFilterOptions(
    dateFilterOptions: IDateFilterOptionsByType,
): IDateFilterOptionsByType {
    const { absoluteForm, absolutePreset, allTime, relativeForm, relativePreset } = dateFilterOptions;
    return {
        ...(allTime && { allTime }),
        ...(absoluteForm && { absoluteForm }),
        ...(!isEmpty(absolutePreset) && { absolutePreset }),
        ...(relativeForm && { relativeForm }),
        ...(!isEmpty(relativePreset) && { relativePreset }),
    };
}

function sanitizeDateFilterOption<
    T extends
        | RelativeDateFilterOption
        | AbsoluteDateFilterOption
        | IAbsoluteDateFilterPreset
        | IRelativeDateFilterPreset,
>(option: T): T {
    return {
        ...option,
        from: min([option.from, option.to]),
        to: max([option.from, option.to]),
    };
}
