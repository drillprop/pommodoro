import React, { FC, useState, FormEvent, useEffect, memo, useRef } from 'react';
import styled from 'styled-components';
import { primFont, secondFont } from '../../utils/fonts';
import { secondary, secondaryBackground, primary } from '../../utils/colors';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../duck/tasks/tasksActions';
import useSubmitTask from '../../hooks/useSubmitTask';
import { EditCreateTask } from '../../elements/Forms';
import { animated, useSpring } from 'react-spring';
import EditTask from './EditTask';

const StyledTask = styled(animated.li)`
  display: grid;
  grid-template-columns: 1fr 140px;
  background: ${secondaryBackground};
  padding-left: 12px;
  justify-content: space-between;
  align-items: center;
  font-family: ${primFont};
  border: solid 1px ${secondary};
  border-radius: 5px;
  font-size: 20px;
  margin-bottom: 16px;
`;
const StyledButton = styled.button`
  padding: 10px 12px;
  width: 50%;
  border: none;
  cursor: pointer;
  background: ${secondaryBackground};
  font-family: ${secondFont};
  color: ${primary};
  font-weight: 700;
  text-transform: lowercase;
`;

const Task: FC<{
  task: string;
  newlyCreated: boolean;
}> = ({ task, newlyCreated }) => {
  const dispatch = useDispatch();

  const [editable, setAsEditable] = useState(false);

  // fire spring animation only if task is created
  // if component is just mount dont do anything

  const isCreated = useRef(newlyCreated);

  const springProps = useSpring({
    from: isCreated.current && {
      transform: 'translateX(-200px)'
    },
    to: isCreated.current && {
      transform: 'translateX(0)'
    }
  });

  useEffect(() => {
    if (isCreated.current) {
      isCreated.current = false;
    }
  });

  return editable ? (
    <EditTask setAsEditable={setAsEditable} task={task} />
  ) : (
    <StyledTask style={springProps}>
      {task}
      <div>
        <StyledButton onClick={() => setAsEditable(true)}>Edit</StyledButton>
        <StyledButton onClick={() => dispatch(deleteTask(task))}>
          Delete
        </StyledButton>
      </div>
    </StyledTask>
  );
};

export default Task;
