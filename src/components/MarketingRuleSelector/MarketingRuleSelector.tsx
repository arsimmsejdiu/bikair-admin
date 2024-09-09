import {Grid, Skeleton} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useController, UseControllerProps} from "react-hook-form";
import {arraysEqual} from "services/utils";

import ConfigurationSubOptions from "./Configuration";
import RuleMultiSelect from "./RuleMultiSelect";
import {MarketingCampaignConfiguration,MarketingCampaigns, MCCRules} from "@bikairproject/shared";

//Sequelize implementation make ts go round and round with circular ref
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
interface MarketingRuleSelectorProps extends UseControllerProps<MarketingCampaigns, "configuration"> {
    loading?: boolean;
    onConfigurationChange?: (configuration: MarketingCampaignConfiguration) => void;
}

export const MarketingRuleSelector = (
    {
        loading,
        onConfigurationChange,
        ...props
    }: MarketingRuleSelectorProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ruleSelection, setRuleSelection] = useState<string[]>([]);

    const {field} = useController<MarketingCampaigns, "configuration">(props);

    useEffect(() => {
        if (typeof field.value !== "undefined") {
            const newConfiguration = {...field.value};
            //if value have one element removed, we must remove the corresponding missing rule
            for (let i = 0; i < (newConfiguration.rules ?? []).length; i++) {
                const type = newConfiguration.rules[i].type;
                if (!ruleSelection.includes(type)) {
                    newConfiguration.rules.splice(i, 1);
                }
            }
            const types = newConfiguration.rules.map(r => r.type) as string[];
            for (let i = 0; i < ruleSelection.length; i++) {
                if (!types.includes(ruleSelection[i])) {
                    newConfiguration.rules.push({type: ruleSelection[i]} as MCCRules);
                }
            }
            field.onChange(newConfiguration);
            if (typeof onConfigurationChange !== "undefined") {
                onConfigurationChange(newConfiguration);
            }
        }
    }, [ruleSelection]);

    useEffect(() => {
        if (typeof field.value !== "undefined") {
            const newSelection = field.value.rules.map((r: MCCRules) => r.type);
            if (!arraysEqual(newSelection, ruleSelection)) {
                setRuleSelection(field.value.rules.map((r: MCCRules) => r.type));
            }
        }
    }, [field.value]);

    useEffect(() => {
        if (typeof loading !== "undefined") {
            setIsLoading(loading);
        } else {
            setIsLoading(false);
        }
    }, [loading]);

    const handleConfigurationChange = (rules: MCCRules[]) => {
        let newConfiguration: MarketingCampaignConfiguration;
        if (typeof field.value !== "undefined") {
            newConfiguration = {...field.value};
        } else {
            newConfiguration = {
                rules: []
            };
        }
        newConfiguration.rules = rules;
        field.onChange(newConfiguration);
        if (typeof onConfigurationChange !== "undefined") {
            onConfigurationChange(newConfiguration);
        }
    };

    if (isLoading || typeof field.value === "undefined") {
        return (
            <Skeleton
                variant="text"
                sx={{
                    fontSize: "1rem",
                    width: "100%"
                }}
            />
        );
    }

    return (
        <Grid container spacing={2} sx={{width: "100%"}}>
            <Grid item xs={12} md={6}>
                <RuleMultiSelect value={ruleSelection} onValueChange={setRuleSelection}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <ConfigurationSubOptions
                    rules={field.value?.rules ?? []}
                    loading={isLoading}
                    onRulesChange={handleConfigurationChange}
                />
            </Grid>
        </Grid>
    );
};

export default MarketingRuleSelector;
