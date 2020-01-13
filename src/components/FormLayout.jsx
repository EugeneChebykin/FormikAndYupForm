import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { Form, Input, Icon, Checkbox, Button, Row, Col, Alert } from 'antd';
import { FieldArray } from 'formik';

const FormLayout = props => {
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item
        label="Name"
        validateStatus={touched.name && errors.name ? 'error' : null}
        help={touched.name && errors.name ? errors.name : null}
      >
        <Input
          type="text"
          id="name"
          prefix={<Icon type="user" />}
          placeholder="Enter a name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
      <Form.Item
        label="Email"
        validateStatus={touched.email && errors.email ? 'error' : null}
        help={touched.email && errors.email ? errors.email : null}
      >
        <Input
          type="email"
          id="email"
          prefix={<Icon type="mail" />}
          placeholder="Enter an email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
      <Form.Item
        label="Age"
        validateStatus={touched.age && errors.age ? 'error' : null}
        help={touched.age && errors.age ? errors.age : null}
      >
        <Input
          type="number"
          id="age"
          prefix={<Icon type="user" />}
          placeholder="Enter an age"
          value={values.age}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        validateStatus={touched.password && errors.password ? 'error' : null}
        help={touched.password && errors.password ? errors.password : null}
      >
        <Input
          type="password"
          id="password"
          prefix={<Icon type="lock" />}
          placeholder="Enter a password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
      <Form.Item
        label="Password confirmation"
        validateStatus={touched.confirmation && errors.confirmation ? 'error' : null}
        help={touched.confirmation && errors.confirmation ? errors.confirmation : null}
      >
        <Input
          type="password"
          id="confirmation"
          prefix={<Icon type="lock" />}
          placeholder="Confirm a password"
          value={values.confirmation}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
      <Form.Item
        label="Website"
        validateStatus={touched.website && errors.website ? 'error' : null}
        help={touched.website && errors.website ? errors.website : null}
      >
        <Input
          type="url"
          id="website"
          prefix={<Icon type="global" />}
          placeholder="Enter a website"
          value={values.website}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
      <Form.Item
        label="Accept terms"
        validateStatus={touched.acceptTerms && errors.acceptTerms ? 'error' : null}
        help={touched.acceptTerms && errors.acceptTerms ? errors.acceptTerms : null}
      >
        <Checkbox id="acceptTerms" checked={values.acceptTerms} onChange={handleChange} />
      </Form.Item>
      <Form.Item
        label="Skills"
        validateStatus={touched.skills && errors.skills ? 'error' : null}
        help={touched.skills && errors.skills ? errors.skills : null}
      >
        <FieldArray
          name="skills"
          render={({ remove, push }) => {
            const rows = values.skills.map(({ id, name }, index) => (
              <Row key={id}>
                <Col span={12}>
                  <Input name={`skills[${index}].name`} value={name} onChange={handleChange} />
                </Col>
                <Col span={2}>
                  {values.skills.length >= 2 && (
                    <Button
                      type="danger"
                      shape="circle"
                      icon="close"
                      onClick={() => remove(index)}
                    />
                  )}
                </Col>
              </Row>
            ));
            return (
              <div>
                {rows}
                <Button type="primary" onClick={() => push({ id: uniqueId(), name: '' })}>
                  Add Skill
                </Button>
              </div>
            );
          }}
        />
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Form.Item>
      {(values.success || errors.success) && (
        <Alert
          type={errors.success ? 'error' : 'success'}
          message={errors.success ? errors.success : values.success}
        />
      )}
    </Form>
  );
};

FormLayout.propTypes = {
  values: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormLayout;
