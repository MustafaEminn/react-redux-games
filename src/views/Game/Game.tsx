import Layout from "../../components/layout/Layout";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { BASE } from "../../config/base";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Card, Col, Row } from "antd";
import Carousel, { arrowsPlugin, Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import s from "./Game.module.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

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
  minimum_system_requirements: IDatasMinimumSystemReq;
  screenshots: IDatasScreenshots;
}

const GameView = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [data, setData] = useState<IDatas>();
  const [carousels, setCarousels] = useState<JSX.Element[]>([]);
  const [thumbnails, setThumbnails] = useState<JSX.Element[]>([]);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const { gameName, gameId }: { gameName: string; gameId: string } =
    useParams();

  useEffect(() => {
    axios
      .get(BASE.GAME_API_URL + "?id=" + gameId)
      .then((res) => {
        setData(res.data);
        let screenShots = Object.values(res.data.screenshots as IDatas);
        let newCarousels = screenShots.map((item: IDatasScreenshots) => {
          return <img src={item.image} className={s.carouselImg} />;
        });
        let newThumbnails = screenShots.map((item: IDatasScreenshots) => {
          return <img src={item.image} className={s.thumbnailImg} />;
        });

        setCarousels(newCarousels);
        setThumbnails(newThumbnails);
        setPageLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "We got error when data fetching. Please refresh the page."
        );
      });
  }, []);

  const onChangeCarousel = (index: number) => {
    setCarouselIndex(index);
  };
  return (
    <Layout loading={pageLoading}>
      <h1 className={s.title}>{data?.title}</h1>
      <Row className={s.carouselContainer}>
        <Carousel
          value={carouselIndex}
          onChange={(index) => onChangeCarousel(index)}
          slides={carousels}
          plugins={[
            {
              resolve: arrowsPlugin,
              options: {
                arrowLeft: (
                  <Button
                    icon={<LeftOutlined />}
                    disabled={carouselIndex === 0}
                    type="primary"
                  />
                ),
                arrowLeftDisabled: <></>,
                arrowRight: (
                  <Button
                    icon={<RightOutlined />}
                    disabled={carouselIndex === carousels.length - 1}
                    type="primary"
                  />
                ),
                arrowRightDisabled: <></>,
                addArrowClickHandler: true,
              },
            },
          ]}
        />
        <Dots
          className={s.thumbnails}
          number={carousels.length}
          thumbnails={thumbnails}
          value={carouselIndex}
          onChange={(index) => onChangeCarousel(index)}
        />
      </Row>
      <Row gutter={16}>
        <Col sm={24} md={14}>
          <Card type="inner" title="Details">
            <h3>Description</h3>
            <p>{data?.description}</p>
            <h3>Genre</h3>
            <p>{data?.genre}</p>
            <h3>Publisher</h3>
            <p>{data?.publisher}</p>
            <h3>Developer</h3>
            <p>{data?.developer}</p>
            <h3>Release Date</h3>
            <p>{data?.release_date}</p>
          </Card>
        </Col>
        <Col sm={24} md={10}>
          <Card type="inner" title="System Requirements">
            <h3>OS</h3>
            <p>{data?.minimum_system_requirements.os}</p>
            <h3>Processor</h3>
            <p>{data?.minimum_system_requirements.processor}</p>
            <h3>Memory</h3>
            <p>{data?.minimum_system_requirements.memory}</p>
            <h3>Graphics</h3>
            <p>{data?.minimum_system_requirements.graphics}</p>
            <h3>Storage</h3>
            <p>{data?.minimum_system_requirements.storage}</p>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default GameView;
