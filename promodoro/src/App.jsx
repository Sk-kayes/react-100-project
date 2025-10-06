import React, { useState, useEffect } from 'react'
import '@ant-design/v5-patch-for-react-19';
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { Button, Divider, Form, Input, InputNumber, Modal } from 'antd';
import { useGoal } from './zustand/useGoal';
import moment from 'moment';
import { nanoid } from 'nanoid';

const App = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [timers, setTimers] = useState({});
  const { goals, setGoals, removeGoal, updateGoal } = useGoal();

  const createGoal = (value) => {
    value.progress = 0;
    value.date = new Date();
    value.id = nanoid();
    setGoals(value);
    handleClose();
    console.log(value);
  }

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    Object.keys(timers).forEach(goalId => {
      if (timers[goalId]) {
        const currentGoal = goals.find(g => g.id === goalId);
        if (currentGoal) {
          const totalSeconds = currentGoal.timer * 60;
          if (currentGoal.progress < totalSeconds) {
            const timeoutId = setTimeout(() => {
              updateGoal(goalId, { progress: currentGoal.progress + 1 });
            }, 1000);
            return () => clearTimeout(timeoutId);
          } else {
            setTimers(prev => ({ ...prev, [goalId]: false }));
          }
        }
      }
    });
  }, [goals, timers, updateGoal]);

  const trackProgress = (goal) => {
    const goalId = goal.id;
    setTimers(prev => ({ ...prev, [goalId]: !prev[goalId] }));
  };

  return (
    <div className='bg-gray-200 min-h-screen py-4'>
      <div className='w-9/12 mx-auto'>
        <div className='text-center py-8 bg-[linear-gradient(336deg,_#30cfd0,_#330867)] rounded'>
          <h1 className='text-3xl font-bold mb-4 text-white'>
            Promodoro Timer
          </h1>
          <p className='text-gray-200 text-lg w-2xl mx-auto'>
            Stay focused and boost your productivity with the Promodoro technique. Work in short, timed sessions and take regular breaks to recharge.
          </p>
          <button onClick={() => setOpen(true)} className='shadow-lg active:scale-90 duration-300 font-medium bg-gradient-to-r from-rose-600 via-red-500 to-rose-600 text-white px-4 py-3 rounded-md flex items-center gap-[10px] mx-auto mt-4 cursor-pointer'><FaPlus />Add Task</button>
        </div>
        <div className='p-8 space-y-12 bg-white'>
          {
            goals.length === 0 ? <div className='text-center text-gray-500'>No goals found</div> :
              goals.map((goal) => (
                <div key={goal.id} className='border p-8 border-gray-200 rounded-lg shadow hover:shadow-lg '>
                  <div className='relative'>
                    <h1 className='text-2xl font-bold'>{goal.title}</h1>
                    <p className='text-gray-600'>{goal.description}</p>
                    <label className='text-sm text-gray-500 mt-4 flex items-center gap-[5px]'><IoCalendarOutline />{moment(goal.date).format('DD MMM, YYYY hh:mm A')}</label>
                    <div className='mt-6'>
                      <h1 className='text-3xl font-bold'>{Math.floor(goal.progress / 60)}:{(goal.progress % 60).toString().padStart(2, '0')} / {goal.timer} min</h1>
                      <div className='w-full bg-gray-200 rounded-full h-2 mt-4'>
                        <div
                          className='bg-green-500 h-2 rounded-full transition-all duration-300'
                          style={{ width: `${(goal.progress / (goal.timer * 60)) * 100}%` }}
                        ></div>
                      </div>
                      <button onClick={() => trackProgress(goal)} className='shadow-lg active:scale-90 duration-300 font-medium bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-[10px] cursor-pointer mt-4'>
                        <LuAlarmClock />{timers[goal.id] ? 'Stop' : 'Start'}
                      </button>
                    </div>
                    <button onClick={() => removeGoal(goal.id)} className='absolute top-0 right-0 shadow-lg active:scale-95 duration-300 font-medium bg-gradient-to-r from-rose-600 via-red-500 to-rose-600 text-white px-2 py-2 rounded-md flex items-center gap-[8px] cursor-pointer'><MdDelete />Remove</button>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
      <Modal open={open} onCancel={handleClose} footer={null} title="Create New Goal" width={720}>
        <Divider />
        <Form layout='vertical' onFinish={createGoal} form={form}>
          <Form.Item rules={[{ required: true }]} label="Goal Title" name="title">
            <Input size='large' placeholder='Enter Goal Title' />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="Description" name="description">
            <Input.TextArea size='large' placeholder='Enter Goal Description' rows={5} />
          </Form.Item>
          <Form.Item rules={[{ required: true, type: "number" }]} label="Timer in minute" name="timer">
            <InputNumber className='!w-full' size='large' placeholder='Timer in minute' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' size='large'>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default App;