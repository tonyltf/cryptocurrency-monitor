import * as React from 'react';
import styled from 'styled-components';
import flex from '../modules/flex.module.css';
import card from '../modules/card.module.css';

const CardWrapper = styled.div``;
const CardTitle = styled.div``;
const CardSubtitle = styled.div``;
const ItemContainer = styled.div``;
const ItemWrapper = styled.div``;
const ItemLabel = styled.div``;
const ItemValue = styled.div``;

export const Card = ({
  height,
  width,
  title,
  subtitle,
  items,
}: {
  height?: number;
  width?: number;
  title: string;
  subtitle: string;
  items: { label: string; value: string; className?: string }[];
}) => {
  return (
    <CardWrapper className={`${flex.child} ${card.cardWrapper}`} data-cy="card">
      <CardTitle data-cy="cardTitle" className={card.cardTitle}>
        {title}
      </CardTitle>
      <CardSubtitle data-cy="cardSubtitle" className={card.cardSubtitle}>
        {subtitle}
      </CardSubtitle>
      <ItemContainer className={flex.parent}>
        {items?.map(({ label, value, className }) => {
          return (
            <ItemWrapper key={label} className={flex.child}>
              <ItemLabel>{label} :</ItemLabel>
              <ItemValue
                data-cy={`cardItem${label}Value`}
                className={className}
              >
                {value}
              </ItemValue>
            </ItemWrapper>
          );
        })}
      </ItemContainer>
    </CardWrapper>
  );
};
