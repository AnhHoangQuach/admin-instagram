import { Button, debounce, Grid, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const UserSearch = ({ onChange }: { onChange: any }) => {
  const location = useLocation();
  const params = Object.fromEntries(new URLSearchParams(location.search));

  const [email, setEmail] = useState(params.email ?? '');
  const [queries, setQueries] = useState({ email });

  const handleClickReset = () => {
    setEmail('');
    setQueries({ email: '' });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceChangeParams = useCallback(
    debounce((values) => {
      setQueries((params) => ({ ...params, ...values }));
    }, 300),
    [],
  );

  useEffect(() => {
    onChange({ ...queries });
  }, [onChange, queries]);

  return (
    <Grid container spacing={3}>
      <Grid item sm={3}>
        <TextField
          fullWidth
          label='Email'
          value={email}
          placeholder='Email'
          onChange={(event) => {
            setEmail(event.target.value);
            debounceChangeParams({ email: event.target.value });
          }}
        />
      </Grid>

      <Grid item sm={3}>
        <Button variant='outlined' onClick={handleClickReset}>
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserSearch;
