import * as React from "react";
import styled from "styled-components";
import styles from "./flex.module.css";

const CardWrapper = styled.div<{ height?: number; width?: number }>`
  border: 1px solid #aaa;
  padding: 1em;
  width: ${({ width }: { width?: number }) => (width ? width + "px" : "auto")};
  max-width: ${({ width }: { width?: number }) =>
    width ? width + "px" : "auto"};
  height: ${({ height }: { height?: number }) =>
    height ? height + "px" : "auto"};
`;

const CardTitle = styled.div`
  font-size: 2em;
`;

const CardSubtitle = styled.div`
  color: orange;
`;

const ItemContainer = styled.div`
  display: flex;
`;

const ItemWrapper = styled.div``;

const ItemLabel = styled.div``;

const ItemValue = styled.div<{ color: string }>`
  color: ${({ color }: { color: string }) => color};
`;

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
  items: { label: string; value: string; color?: string }[];
}) => {
  return (
    <CardWrapper
      className={styles.child}
      height={height}
      width={width}
      data-cy="card"
    >
      <CardTitle data-cy="cardTitle">{title}</CardTitle>
      <CardSubtitle data-cy="cardSubtitle">{subtitle}</CardSubtitle>
      <ItemContainer className={styles.parent}>
        {items?.map(({ label, value, color }) => {
          return (
            <ItemWrapper key={label} className={styles.child}>
              <ItemLabel>{label} :</ItemLabel>
              <ItemValue
                data-cy={`cardItem${label}Value`}
                color={color || "black"}
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
