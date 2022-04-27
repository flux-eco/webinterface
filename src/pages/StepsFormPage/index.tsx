import React, { useRef } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, {
  StepsForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormDateRangePicker,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<ProFormInstance>();

  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async () => {
          await waitTime(1000);
          message.success('todo success');
        }}
        formProps={{
          validateMessages: {
            required: 'todo required',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="todo title"
          stepProps={{
            description: 'todo description',
          }}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            name="name"
            label="todo label"
            width="md"
            tooltip="todo tooltip"
            placeholder="todo placeholder"
            rules={[{ required: true }]}
          />
          <ProFormDatePicker name="date" label="todo datepicker" />
          <ProFormDateRangePicker name="dateTime" label="todo datetime" />
          <ProFormTextArea name="remark" label="todo label" width="lg" placeholder="todo placeholder" />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="checkbox"
          title="todo title"
          stepProps={{
            description: 'todo decription',
          }}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            return true;
          }}
        >
            <ProFormText name="dbname" label="todo label" />
            <ProFormDatePicker name="datetime" label="todo label" width="sm" />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};
