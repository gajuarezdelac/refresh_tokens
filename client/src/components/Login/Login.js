import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Carousel, message, Spin,Layout } from 'antd';
import { Redirect,Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import * as LoginActions from '../../redux/actions/UserAction';
import './Login.css'

import ReCAPTCHA from "react-google-recaptcha";
import imgSoldador from '../../images/img1.jpg';
import img2 from '../../images/img2.jpg';
import img3 from '../../images/img3.jpg';

const { Content, Footer } = Layout;

const recaptchaRef = React.createRef();


const Login = () => {

    const dispatch = useDispatch()
    const IsAuthenticated = useSelector(state => state.LoginReducer.isAuthenticated)
    const { isLoading } = useSelector(state => state.LoginReducer)
    const [, setRecaptcha] = useState('');

    const handleOnChangeRecaptcha = (e) => {
        let recaptchaValue = recaptchaRef.current.getValue();
        setRecaptcha(recaptchaValue);
    }


    const onFinish = (formValues) => {

        if (process.env.REACT_APP_ENABLE_CAPTCHA === 'True') {
            if (recaptchaRef.current.getValue() === '') {
                message.warning('Selecciona el Recaptcha'); 
                return false;
            }
        }
       
        dispatch(LoginActions.login(formValues));
    }


    if (IsAuthenticated) {
        return (<Redirect to="/dashboard" />)
    } else {
    return (
    <Layout className="layout">                
    <Content style={{ padding: '0 0px' }}>                    
        <div className="site-layout-content">
        <Spin spinning={isLoading} size="large">
                    <Row justify="space-between">
                        <Col span={13} className="section-banner">
                            <Carousel autoplay fade dotPosition="top">
                                <div className="containter-img">
                                    <img className="img-login" src={imgSoldador} alt="img1-login"></img>
                                </div>

                                <div className="containter-img">
                                    <img className="img-login" src={img2} alt="img2-login"></img>
                                </div>

                                <div className="containter-img">
                                    <img className="img-login" src={img3} alt="img1-login"></img>
                                </div>

                            </Carousel>

                        </Col>

                        <Col span={10} className="section-form">
                            <Col span={20}>


                                <Row justify="space-between" className="cabecera" >
                                    <Col span={24}>
                                        <h1 >Bienvenido</h1>
                                        <p className="text">Ingresa tus datos para acceder.</p>
                                    </Col>
                                </Row>

                          <div className="form-container">
                              
                          <Form
                                    name="basic"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    layout="vertical"
                                >
                                     <Form.Item
                                     
                                     label="Tu Correo electronico"
                                     name="email"
                                     rules={[{ required: true, message: 'Please input your email!' }]}
                                    >
                                     <Input size="large" />
                                    </Form.Item>

                                   <Form.Item
                                   label="Tu contraseña"
                                   name="password"
                                   rules={[{ required: true, message: 'Please input your password!' }]}
                                  >
                                  <Input.Password size="large" />
                                  </Form.Item>
                                  
                                   {
                                        process.env.REACT_APP_ENABLE_CAPTCHA === 'True' && <Form.Item>
                                            <ReCAPTCHA
                                                sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHAP}
                                                onChange={(e) => handleOnChangeRecaptcha(e)}
                                                ref={recaptchaRef}
                                            />
                                        </Form.Item>
                                    }


                                    <Form.Item >
                                        <Button type="primary" htmlType="submit" className="btn" block size="large">
                                            Ingresar localmente
                                      </Button> 

                                      <div className="check">
                                       <h4>¿Tienes problemas para acceder?, <Link to="/"> Contacta a la administración </Link></h4>
                                     </div>

                                   </Form.Item>
                                   </Form>
                          </div>

                                
                                        <div className="footer-logo">
                                          <h2 className="container-title">Turis<span className="span-title">Camp</span></h2>
                                        </div>

                                        
                                        <div className="footer-logo">
                                            <h4> <Link to="/">Terminos </Link> | <Link to="/">Condiciones</Link> | <Link to="/">Acerca de</Link></h4>
                                        </div>
                            </Col>

                        </Col>
                    </Row>

                    <Col span={10} className="container-banner">
                    <h2 className="container-title">Turis<span className="span-title">Camp</span></h2>
                        <h5 className="container-description">
                        Campeche es un estado mexicano ubicado en el sudeste que nos ofrece todo el legado de los mayas, opciones naturales, gastronómicas Etc.
                    </h5>
                    </Col>

                    
            </Spin>
        </div>
    </Content>

    <Footer style={{ textAlign: 'right', marginTop: '0px' }} className="Footer">
        <p><span className="powered">Powered</span> by <span className="tic"> UNACAR </span> </p>

        <p>
            Copyright © 2020 TurisCamp S.A. de C.V. Todos los derechos reservados. Este sistema pertenece, es operado y
            monitoreado por Grupo TurisCamp S.A. de C.V. y contiene información confidencial propiedad de Cotemar. Cualquier
            acceso o uso no autorizado a este sistema
            por la administración de Cotemar no será permitido y podrá ser reportado a las autoridades competentes y/o ser
            objeto de alguna acción civil. Si usted no está autorizado a accesar o usar este sistema, desconectese ahora.
                </p>
    </Footer>
   </Layout>       
  );
  }

}

export default Login;
