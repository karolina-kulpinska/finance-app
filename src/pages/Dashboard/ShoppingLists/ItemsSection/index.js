import React from "react";
import { ItemCard } from "../ItemCard";
import * as S from "./styled";

export const ItemsSection = ({
  items,
  listId,
  onToggle,
  onDelete,
}) => {
  const toBuy = items.filter((item) => !item.purchased);
  const purchased = items.filter((item) => item.purchased);

  return (
    <>
      {toBuy.length > 0 && (
        <S.Block>
          <S.Header>🛒 Do kupienia</S.Header>
          <S.List>
            {toBuy.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onToggle={() => onToggle(listId, item.id)}
                onDelete={() => onDelete(listId, item.id)}
              />
            ))}
          </S.List>
        </S.Block>
      )}

      {purchased.length > 0 && (
        <S.Block>
          <S.Header>✓ Kupione</S.Header>
          <S.List>
            {purchased.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onToggle={() => onToggle(listId, item.id)}
                onDelete={() => onDelete(listId, item.id)}
              />
            ))}
          </S.List>
        </S.Block>
      )}
    </>
  );
};
