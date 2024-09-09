import Skeleton from "@mui/material/Skeleton";
import React, { useEffect, useState } from "react";

import RangeAge from "./RangeAge";
import SelectCity from "./SelectCity";
import SelectPeriod from "./SelectPeriod";
import { MCCRules } from "@bikairproject/shared";

interface ConfigurationSubOptionsProps {
    rules: MCCRules[];
    loading?: boolean;
    onRulesChange: (rule: MCCRules[]) => void;
}

const ConfigurationSubOptions = ({
    rules,
    loading,
    onRulesChange
}: ConfigurationSubOptionsProps) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (typeof loading !== "undefined") {
            setIsLoading(loading);
        } else {
            setIsLoading(false);
        }
    }, [loading]);

    const handleRuleChange = (rule: MCCRules) => {
        const newRules = [ ...rules ];
        for (let i = 0; i < newRules.length; i++) {
            if (newRules[i].type === rule.type) {
                newRules[i] = rule;
                if (typeof onRulesChange !== "undefined") {
                    onRulesChange(newRules);
                }
                return;
            }
        }
        newRules.push(rule);
        if (typeof onRulesChange !== "undefined") {
            onRulesChange(newRules);
        }
    };

    const renderSubOption = (rule: MCCRules) => {
        let subOption;
        switch (rule.type) {
            case "RANGE_AGE":
                subOption = <RangeAge rule={rule} onRuleChange={handleRuleChange}/>;
                break;
            case "CITY_SELECT":
                subOption = <SelectCity rule={rule} onRuleChange={handleRuleChange}/>;
                break;
            case "LAST_TRIP_PERIOD":
                subOption = <SelectPeriod rule={rule} onRuleChange={handleRuleChange}/>;
                break;
            default:
                subOption = null;
                break;
        }
        return subOption;
    };

    if (isLoading) {
        return (
            <div>
                <Skeleton variant="rounded" width={"100%"} height={10}/>
                <Skeleton variant="rounded" width={"100%"} height={10}/>
            </div>

        );
    }

    return (
        <>
            {
                rules.map(renderSubOption)
            }
        </>
    );
};

export default ConfigurationSubOptions;
