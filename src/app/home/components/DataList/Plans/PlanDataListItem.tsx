import React from 'react';
import {
  Button,
  DataListItem,
  DataListToggle,
  DataListItemRow,
  DataListItemCells,
  DataListCell,
  DataListAction,
} from '@patternfly/react-core';
import { useExpandDataList, useOpenModal } from '../../../duck/hooks';
import { PlusCircleIcon } from '@patternfly/react-icons';
import WizardContainer from '../../../../plan/components/Wizard/WizardContainer';
import PlanContent from './PlanContent';

const PlanDataListItem = ({
  clusterList,
  storageList,
  onPlanSubmit,
  isLoading,
  planList,
  plansDisabled,
  onStartPolling,
  onStopPolling,
}) => {
  const [isExpanded, toggleExpanded] = useExpandDataList(false);
  const [isOpen, toggleOpen] = useOpenModal(false);
  if (planList) {
    return (
      <DataListItem aria-labelledby="ex-item1" isExpanded={isExpanded}>
        <DataListItemRow>
          <DataListToggle
            onClick={() => {
              if (isExpanded) {
                onStopPolling();
              } else {
                onStartPolling();
              }
              toggleExpanded();
            }}
            isExpanded={isExpanded}
            id="plan-toggle"
          />
          <DataListItemCells
            dataListCells={[
              <DataListCell id="plan-item" key="plans">
                <span id="name">Plans</span>
              </DataListCell>,
            ]}
          />
          <DataListAction aria-label="add-plan" aria-labelledby="plan-item" id="add-plan">
            <Button isDisabled={plansDisabled} onClick={toggleOpen} variant="link">
              <PlusCircleIcon /> Add Plan
            </Button>
            <WizardContainer
              planList={planList}
              clusterList={clusterList}
              storageList={storageList}
              isOpen={isOpen}
              onHandleClose={toggleOpen}
              isLoading={isLoading}
              onPlanSubmit={onPlanSubmit}
            />
          </DataListAction>
        </DataListItemRow>
        <PlanContent
          onPlanSubmit={onPlanSubmit}
          plansDisabled={plansDisabled}
          planList={planList}
          clusterList={clusterList}
          storageList={storageList}
          isLoading={isLoading}
          isExpanded={isExpanded}
        />
      </DataListItem>
    );
  }
  return null;
};

export default PlanDataListItem;
