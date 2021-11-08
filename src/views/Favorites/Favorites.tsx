import { useEffect, useState } from "react";

import { Row, Col, Card, Spin, Button, Empty, Space } from "antd";
import {
  ArrowRightOutlined,
  HeartFilled,
  LoadingOutlined,
} from "@ant-design/icons";

import Layout from "../../components/layout/Layout";
import s from "./Favorites.module.scss";
import axios from "axios";
import { BASE } from "../../config/base";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import slug from "slug";

interface IDatasMinimumSystemReq {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

interface IDatasScreenshots {
  id: number;
  image: string;
}

interface IDatas {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  addedAt: string;
  minimum_system_requirements: IDatasMinimumSystemReq;
  screenshots: IDatasScreenshots;
}

interface IFavorites {
  gameId: number;
  // Please use new Date().toLocaleDateString()
  addedAt: string;
}

function FavoritesView() {
  const [datas, setDatas] = useState<Array<IDatas>>([]);
  const [favorites, setFavorites] = useState<Array<IFavorites>>(
    (localStorage.favorites && JSON.parse(localStorage.favorites)) || []
  );
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.favorites) {
      localStorage.favorites = JSON.stringify([]);
    }

    if (favorites.length === 0) {
      setPageLoading(false);
    }

    let newDatas: Array<IDatas> = [];
    let getGameRunCount: number = 0;
    let getGame = (gameId: number, index: number) => {
      axios
        .get(BASE.GAME_API_URL + "?id=" + gameId)
        .then((res) => {
          newDatas.push({ ...res.data, addedAt: favorites[index].addedAt });
          getGameRunCount++;
          if (favorites.length === getGameRunCount) {
            setPageLoading(false);
            setDatas(newDatas);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            "We got error when data fetching. Please refresh the page."
          );
          getGameRunCount++;
          if (favorites.length === getGameRunCount) {
            setPageLoading(false);
            setDatas(newDatas);
          }
        });
    };

    favorites.map((item, index) => {
      getGame(item.gameId, index);
    });
  }, []);

  const removeItemFromFavorites = (gameId: Readonly<number>) => {
    let newFavorites = favorites.filter((item: IFavorites, index: number) => {
      return item.gameId !== gameId;
    });
    let newDatas = datas.filter((item: IDatas, index: number) => {
      return item.id !== gameId;
    });

    localStorage.favorites = JSON.stringify(newFavorites);
    setFavorites(newFavorites);

    setDatas(newDatas);
  };

  return (
    <Layout loading={pageLoading}>
      {loading ? (
        <Row justify="center">
          <Spin
            indicator={
              <LoadingOutlined style={{ fontSize: 40, color: "#000" }} spin />
            }
          />
        </Row>
      ) : (
        <Row
          gutter={[16, 16]}
          className={s.cardsContainer}
          justify="start"
          wrap
        >
          {favorites.length === 0 && (
            <Empty
              className={s.empty}
              description="You has not favorite game."
            />
          )}
          {datas &&
            datas.map((item: IDatas, index: number) => (
              <Col
                key={index}
                xs={24}
                sm={24}
                md={8}
                xl={6}
                className={s.cardContainer}
              >
                <Card bodyStyle={{ padding: 0 }}>
                  <Link to={`/${slug(item.title)}/${item.id}`}>
                    <img loading="lazy" src={item.thumbnail} />
                  </Link>
                  <Link to={`/${slug(item.title)}/${item.id}`}>
                    <h1 className={s.cardContainer_title}>{item.title}</h1>
                  </Link>
                  <p className={s.cardContainer_shortDescription}>
                    {item.short_description}
                  </p>

                  <div className={s.cardContainer_genre}>
                    <h3>Genre:</h3>
                    <p className={s.cardContainer_shortDescription}>
                      {item.genre}
                    </p>
                  </div>
                  <div className={s.cardContainer_addedAt}>
                    <h3>Added at:</h3>
                    <p>{item.addedAt}</p>
                  </div>

                  <Row className={s.cardContainer_buttons}>
                    <Col md={12} sm={24} xs={24}>
                      <Button
                        className={s.cardContainer_buttonsButtonRemove}
                        type="primary"
                        icon={<HeartFilled />}
                        onClick={() => removeItemFromFavorites(item.id)}
                      >
                        Remove favorite
                      </Button>
                    </Col>
                    <Col md={12} sm={24} xs={24}>
                      <Link
                        to={`/${slug(item.title)}/${item.id}`}
                        className={s.cardContainer_buttonsLink}
                      >
                        <Button
                          type="default"
                          icon={<ArrowRightOutlined />}
                          className={s.cardContainer_buttonsLinkButton}
                        >
                          Read more
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
        </Row>
      )}
    </Layout>
  );
}

export default FavoritesView;
