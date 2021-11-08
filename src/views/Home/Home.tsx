import { useEffect, useState } from "react";

import { Select, Form, Row, Col, Button, Card, Spin } from "antd";
import {
  ArrowRightOutlined,
  HeartFilled,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import Layout from "../../components/layout/Layout";
import s from "./Home.module.scss";
import axios from "axios";
import { BASE } from "../../config/base";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import slug from "slug";
import { IFavorites } from "../../types/favorites";
import { IDatas } from "../../types/datas";
import { concatDataAndFavorites } from "../../utils/concats";

function HomeView() {
  const [datas, setDatas] = useState<Array<IDatas>>([]);
  const [favorites, setFavorites] = useState<Array<IFavorites>>(
    (localStorage.favorites && JSON.parse(localStorage.favorites)) || []
  );
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const Option = Select.Option;
  const [filterForm] = Form.useForm();

  const categories = [
    "Mmorpg",
    "Shooter",
    "Strategy",
    "Moba",
    "Racing",
    "Sports",
    "Social",
    "Sandbox",
    "Open-world",
    "Survival",
    "Pvp",
    "Pve",
    "Pixel",
    "Voxel",
    "Zombie",
    "Turn-based",
    "First-person",
    "Third-Person",
    "Top-down",
    "Tank",
    "Space",
    "Sailing",
    "Side-scroller",
    "Superhero",
    "Permadeath",
    "Card",
    "Battle-royale",
    "Mmo",
    "Mmofps",
    "Mmotps",
    "3d",
    "2d",
    "Anime",
    "Fantasy",
    "Sci-fi",
    "Fighting",
    "Action-rpg",
    "Action",
    "Military",
    "Martial-arts",
    "Flight",
    "Low-spec",
    "Tower-defense",
    "Horror",
    "Mmorts",
  ];

  const onFilter = () => {
    let values = filterForm.getFieldsValue();
    if (!values.platform && !values.sort && !values.category) {
      toast.info("Please enter filter.");
      return;
    }
    setLoading(true);

    let requestParams: any = {};

    let addToParams = (params: Array<string> | string, paramsName: string) => {
      if (typeof params === "string") {
        requestParams[paramsName] = params;
      } else {
        requestParams[paramsName] = params.join(".");
      }
    };

    values.platform && addToParams(values.platform, "platform");
    values.category && addToParams(values.category, "tag");
    values.sort && addToParams(values.sort, "sort-by");

    axios
      .get(BASE.GAMES_API_URL, { params: requestParams })
      .then((res) => {
        let newDataWithFavorites = concatDataAndFavorites(
          res.data as Array<IDatas>,
          favorites
        );
        setDatas(newDataWithFavorites);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "We got error when data fetching. Please try again the search."
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!localStorage.favorites) {
      localStorage.favorites = JSON.stringify([]);
    }
    axios
      .get(BASE.GAMES_API_URL)
      .then((res) => {
        let newDataWithFavorites = concatDataAndFavorites(
          res.data as Array<IDatas>,
          favorites
        );
        setDatas(newDataWithFavorites);
        setPageLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "We got error when data fetching. Please refresh the page."
        );
      });
  }, []);

  const addItemToFavorites = (gameId: Readonly<number>) => {
    let isGameAddedBeforeToFavorites = false;
    // I using spread operator because when I update the state don't update because of detect same data.
    favorites.map((item: IFavorites, index: number) => {
      return item.gameId === gameId
        ? (isGameAddedBeforeToFavorites = true)
        : void 0;
    });

    let newFavorites = [...favorites];

    if (!isGameAddedBeforeToFavorites) {
      newFavorites.push({
        gameId: gameId,
        addedAt: new Date().toLocaleDateString(),
      });
    }

    localStorage.favorites = JSON.stringify(newFavorites);
    setFavorites(newFavorites);

    let newData = concatDataAndFavorites(datas, newFavorites);
    setDatas(newData);
  };
  const removeItemFromFavorites = (gameId: Readonly<number>) => {
    let newFavorites = favorites.filter((item: IFavorites, index: number) => {
      return item.gameId !== gameId;
    });

    localStorage.favorites = JSON.stringify(newFavorites);
    setFavorites(newFavorites);

    let newData = concatDataAndFavorites(datas, newFavorites);
    setDatas(newData);
  };

  return (
    <Layout loading={pageLoading}>
      <Form
        onFinish={() => onFilter()}
        form={filterForm}
        layout="vertical"
        className={s.containerForm}
      >
        <Row align="middle" gutter={6}>
          {/* Select Platform  */}
          <Col md={7} xs={24}>
            <Form.Item name="platform" label="Select platform">
              <Select
                showSearch
                className={s.containerFilter_inputSearchFilter}
                placeholder="Select platform"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA: any, optionB: any) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="pc">PC</Option>
                <Option value="browser">Browser</Option>
              </Select>
            </Form.Item>
          </Col>
          {/* Select Category */}
          <Col md={7} xs={24}>
            <Form.Item name="category" label="Select category">
              <Select
                showSearch
                mode="multiple"
                className={s.containerFilter_inputSearchFilter}
                placeholder="Select platform"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA: any, optionB: any) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {categories.map((item) => (
                  <Option value={item.toLowerCase()}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {/* Select Sort */}
          <Col md={7} xs={24}>
            <Form.Item name="sort" label="Select sort">
              <Select
                showSearch
                className={s.containerFilter_inputSearchFilter}
                placeholder="Select sort"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA: any, optionB: any) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="release-date">Release date</Option>
                <Option value="popularity">Popularity</Option>
                <Option value="alphabetical">Alphabetical </Option>
                <Option value="relevance">Relevance</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col md={3} xs={24}>
            <Button
              block
              type="primary"
              icon={<SearchOutlined />}
              htmlType="submit"
              loading={loading}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>

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
          justify="center"
          wrap
        >
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
                    <p>&nbsp;{item.genre}</p>
                  </div>

                  <Row className={s.cardContainer_buttons}>
                    <Col md={12} sm={24} xs={24}>
                      {item.isFavorite ? (
                        <Button
                          className={s.cardContainer_buttonsButtonRemove}
                          type="primary"
                          icon={<HeartFilled />}
                          onClick={() => removeItemFromFavorites(item.id)}
                        >
                          Remove favorite
                        </Button>
                      ) : (
                        <Button
                          className={s.cardContainer_buttonsButton}
                          type="primary"
                          icon={<HeartFilled />}
                          onClick={() => addItemToFavorites(item.id)}
                        >
                          Add to favorite
                        </Button>
                      )}
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

export default HomeView;
