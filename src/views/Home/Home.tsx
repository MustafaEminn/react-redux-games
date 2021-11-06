import { useEffect, useState } from "react";

import { Select, Form, Row, Col, Button, Card, Avatar } from "antd";
import { HeartFilled, SearchOutlined } from "@ant-design/icons";

import Layout from "../../components/layout/Layout";
import s from "./Home.module.scss";
import axios from "axios";
import { BASE } from "../../config/base";

function HomeView() {
  const [datas, setDatas] = useState<Array<IDatas>>();

  const Option = Select.Option;
  const [form] = Form.useForm();

  interface IDatas {
    id: number;
    title: string;
    thumbnail: string;
    short_description: string;
    game_url: string;
    genre: string;
    platform: string;
    publisher: string;
    developer: string;
    release_date: string;
    freetogame_profile_url: string;
  }

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
    let values = form.getFieldsValue();
  };

  useEffect(() => {
    axios.get(BASE.GAMES_API_URL).then((res) => {
      setDatas(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Layout>
      <Form
        onFinish={() => onFilter()}
        form={form}
        layout="vertical"
        className={s.containerForm}
      >
        <Row align="middle" gutter={6}>
          {/* Select Platform  */}
          <Col md={7} xs={24}>
            <Form.Item name="platform" label="Select platform">
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
                <Option value="alphabetical ">Alphabetical </Option>
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
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>{datas && datas.map((item: any) => <Col md={8}></Col>)}</Row>
    </Layout>
  );
}

export default HomeView;
