import React from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import "antd/dist/antd.css";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import DateTimePicker from "react-datetime-picker";

import "./Users.css";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      visible: false,
      currentItem: { activity_periods: [] },
    };
  }
  componentDidMount() {
    axios.get("/Test.json").then((res) => {
      this.setState({ usersList: res.data.members });
    });
  }
  showModal = (item) => {
    this.setState({
      visible: true,
      currentItem: item,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const users = this.state.usersList.map((item) => (
      <div key={item.id} className="users_list">
        <div className="users_list_card">
          <Avatar shape="square" icon={<UserOutlined />} />
          <li className="users_list_card_name">{item.real_name}</li>

          <Button type="primary" onClick={() => this.showModal(item)}>
            Open Modal
          </Button>
        </div>

        <Modal
          title="Users Activity"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          width="1000px"
          centered={true}
        >
          <p className="user_modal_name">
            <span className="user_modal_name_title">Name</span>
            {this.state.currentItem.real_name}
          </p>
          {this.state.currentItem.activity_periods.map((item, index) => (
            <div key={index}>
              <li className="user_list_activity">
                <span className="user_list_activity_title_start">
                  Start Time
                </span>
                {item.start_time}
                <span className="user_activity_calender">
                  <DateTimePicker
                    value={new Date(item.start_time)}
                    format="MM-dd-y h:mm: p"
                  />
                </span>
              </li>
              <li className="user_list_activity">
                <span className="user_list_activity_title_end">End Time</span>
                {item.end_time}
                <span className="user_activity_calender">
                  <DateTimePicker
                    value={new Date(item.end_time)}
                    format="MM-dd-y h:mm: p"
                  />
                </span>
              </li>
            </div>
          ))}
        </Modal>
      </div>
    ));

    return (
      <div>
        <ul className="users_list_names">{users}</ul>
      </div>
    );
  }
}

export default Users;
