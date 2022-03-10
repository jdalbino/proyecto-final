import React, { useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ReadOutlined,
  AppstoreAddOutlined,
  UserOutlined,
  LogoutOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Layout, Menu} from "antd";
import { PageCourses } from "../../pages/courses/courses";
import { PageStore } from "../../pages/store/store";
import { PageUser } from "../../pages/user/user";
import { PageLogin } from "../../pages/login/login";
import { PageLearnCourse } from "../../pages/learnCourse/learnCourse";
import {PageUserSetup} from "../../pages/setup/setup";
import { PageUserEdit } from "../../pages/setup/useredit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { PageCourseDetail } from "../../pages/courseDetail/course-detail";
import { PageMenuSetup } from "../../pages/setup/menusetup";
import { PageUserList } from "../../pages/setup/userlist";
import { PageSetupCourse } from "../../pages/setup/setupcourse";
import { PageCourseEdit } from "../../pages/setup/courseedit";
import { PageCourseList } from "../../pages/setup/courselist";
import { PageMenuSetup2 } from "../../pages/setup2/menusetup";
import { PageUserList2 } from "../../pages/setup2/userlist";

export function LayoutPrivate() {
  const { Header, Sider, Content } = Layout;

  const [toggleMenu, setToggleMenu] = useState(false);

  const loggedIn = useSelector((state) => state.isLogin);

  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={toggleMenu}>
          <div className="logo" />
          <div className="navBar">
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<ReadOutlined />}>
                {loggedIn ? (
                  <Link to="/courses">Mis Cursos</Link>
                ) : (
                  <Link to="/login"></Link>
                )}
              </Menu.Item>
              <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
                {loggedIn ? (
                  <Link to="/store">Libreria</Link>
                ) : (
                  <Link to="/login"></Link>
                )}
              </Menu.Item>
              <Menu.Item key="3" icon={<UserOutlined />}>
                {loggedIn ? (
                  <Link to="/user">Mi perfil</Link>
                ) : (
                  <Link to="/login"></Link>
                )}
              </Menu.Item>
              <Menu.Item key="5" icon={<ToolOutlined />}>
                {loggedIn ? (
                  <Link to="/setup">Setup</Link>
                ) : (
                  <Link to="/login"></Link>
                )}
              </Menu.Item>
              {/* Changes for testing */}
              <Menu.Item key="6" icon={<ToolOutlined />}>
                {loggedIn ? (
                  <Link to="/setup2">Setup</Link>
                ) : (
                  <Link to="/login"></Link>
                )}
              </Menu.Item>
              {/* Changes for testing */}
            </Menu>
            <Menu theme="dark" mode="inline">
              <Menu.Item key="4" icon={<LogoutOutlined />} onClick={()=>{dispatch({
                      type: "SET_IS_LOGIN",
                      payload: false,
                    });
                    window.location.reload();
                    history.push("/login");}}>
                <span>SALIR</span>
              </Menu.Item>
            </Menu>
          </div>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              toggleMenu ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => {
                  setToggleMenu(!toggleMenu);
                },
              }
            )}
            Mis cursos
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <div>
              {/* Routes per page after checking if user is logged in via global variable. */}
               {loggedIn ? (
                <Redirect from="/login" path="/courses">
                  <PageCourses />
                </Redirect>
              ) : (
                <Route path="/login">
                  <PageLogin />
                </Route>
              )}
              {loggedIn ? (
                <Route path="/learnCourse">
                  <PageLearnCourse />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Route path="/courses">
                  <PageCourses />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Route path="/course-detail">
                  <PageCourseDetail />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Route path="/store">
                  <PageStore />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Route path="/user">
                  <PageUser />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Route exact path="/setup">
                  <PageMenuSetup />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Route path="/setup/newuser">
                  <PageUserSetup />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Route path="/setup/userlist">
                  <PageUserList />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Route path="/setup/useredit">
                  <PageUserEdit />
                </Route>
              ) : (
                history.push("/login")
              )}
              {/* test changes */}
              {loggedIn ? (
                <Route exact path="/setup2">
                  <PageMenuSetup2 />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Route path="/setup2/newuser">
                  <PageUserSetup />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Route path="/setup2/userlist">
                  <PageUserList2 />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Route path="/setup2/useredit">
                  <PageUserEdit />
                </Route>
              ) : (
                history.push("/login")
              )}
              {/* test changes */}
              {loggedIn ? (
                <Route path="/setup/newcourse">
                  <PageSetupCourse />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Route path="/setup/courselist">
                  <PageCourseList />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Route path="/setup/editcourse">
                  <PageCourseEdit />
                </Route>
              ) : (
                history.push("/login")
              )}
              {loggedIn ? (
                <Redirect exact from="/" to="/courses"></Redirect>
              ) : (
                <Redirect exact from="/" to="/login"></Redirect>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
