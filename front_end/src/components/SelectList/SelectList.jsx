import React, { useEffect, useState } from 'react'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, Container, Stack, useTheme, ListSubheader, Paper, Box } from '@mui/material'
import { useStore } from '../../stores/Store';
import { observer } from 'mobx-react';


const SelectList = observer(({
  subheader,
  items = [], //array stringova
  fetchItems = () => { }
}) => {
  const [checked, setChecked] = useState([0]);
  const theme = useTheme()

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    fetchItems()
  }, []);

  return (
    <Paper variant='outlined'>
      <Box py={theme.spacing(1)}>

        <Container maxWidth='sm'>
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {subheader}
              </ListSubheader>
            }
          >
            <Stack spacing={theme.spacing(1)}>
              {items.map((item, index) => {
                const labelId = `checkbox-list-label-${item}`;
                return (
                  <ListItem
                    key={index}
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(item)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(item) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${item}`} />
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </Stack>
          </List>
        </Container>
      </Box>
    </Paper>
  )
});

export default SelectList