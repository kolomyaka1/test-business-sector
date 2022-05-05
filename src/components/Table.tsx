import { Grid, Typography, CircularProgress } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TableItemBlock } from './TableItemBlock';
import { useSelector } from 'react-redux';
import { selectLoadingStatus, selectPostsItem } from '../store/selectors/postSelectors';

import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const HeaderGrid = styled(Grid)`
  background-color: #474955;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 20px;
`;

const ArrowDownComponent = styled(ArrowDownIcon)`
  color: white;
  margin-left: 30px;
`;

const ArrowUpComponent = styled(ArrowUpIcon)`
  color: white;
  margin-left: 30px;
`;

const CenterLoader = styled('div')`
  text-align: center;
  margin-top: 460px;
  margin-bottom: 460px;
`;

type column = {
  name: string;
  type: string;
  width: number;
};

type Props = {
  sortBy: string;
  columns: column[];
  changeSort: (type: string) => void;
};

export const Table = ({ columns, sortBy, changeSort }: Props) => {
  const isLoading = useSelector(selectLoadingStatus);
  const posts = useSelector(selectPostsItem);

  return (
    <>
      <HeaderGrid container>
        {columns.map((column) => (
          <React.Fragment key={column.type}>
            <Grid key={column.type} item md={column.width} onClick={() => changeSort(column.type)}>
              <FlexWrapper>
                <Typography color="white">{column.name}</Typography>
                {column.type === sortBy ? <ArrowUpComponent /> : <ArrowDownComponent />}
              </FlexWrapper>
            </Grid>
          </React.Fragment>
        ))}
      </HeaderGrid>

      {isLoading === false ? (
        posts.map((post) => {
          return (
            <TableItemBlock key={post.title} id={post.id} title={post.title} body={post.body} />
          );
        })
      ) : (
        <CenterLoader>
          <CircularProgress color="inherit" />
        </CenterLoader>
      )}
    </>
  );
};
