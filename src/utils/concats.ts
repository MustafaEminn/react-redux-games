import { IDatas } from "../types/datas";
import { IFavorites } from "../types/favorites";

export const concatDataAndFavorites = (
  datasArg: Array<IDatas>,
  favoritesArg: Array<IFavorites>
) => {
  // I mapping favorites every datas map becuase favorites usually small than datas.
  let newDataWithFavorites = datasArg.map((itemData: IDatas) => {
    let isGameAddedToFavorite = false;
    favoritesArg.map((itemFavorite: IFavorites) => {
      itemFavorite.gameId === itemData.id
        ? (isGameAddedToFavorite = true)
        : void 0;
      return;
    });

    return { ...itemData, isFavorite: isGameAddedToFavorite };
  });
  return newDataWithFavorites;
};
