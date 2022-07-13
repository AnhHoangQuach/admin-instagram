import { Lock, Person } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Typography, InputAdornment, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardEvent, useEffect } from 'react';
import { authService } from 'services';
import { useMutation } from 'react-query';
import { signIn, signOut } from 'reducers/profile';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from 'reducers/notification';
import { profileSelector } from 'reducers/profile';
import { store } from 'reducers';
import { useNavigate } from 'react-router-dom';
import { privateRoute } from 'routes';

const LoginForm = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(profileSelector);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(privateRoute.home.path, { replace: true });
    }
  }, [navigate, isLoggedIn]);

  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const { mutate: login, isLoading } = useMutation(authService.login, {
    onSuccess: (data) => {
      dispatch(signIn(data));
      authService.getProfile().then((res) => {
        const { user } = res;
        if (!user) {
          dispatch(signOut());
          return;
        }
        dispatch(signIn(user));
        store.dispatch(openNotification({ message: 'Login successful', variant: 'success' }));
      });
    },
  });

  const handleClickLogin = () => {
    handleSubmit(({ email, password }) => {
      login({ email, password });
    })();
  };

  const onKeyPressPassword = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleClickLogin();
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='w-[330px] mx-auto'>
        <Typography variant='h2' align='center'>
          DASHBOARD LOGIN
        </Typography>
        <div className='space-y-4 my-4'>
          <Controller
            name='email'
            defaultValue=''
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                fullWidth
                placeholder='Email'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Person />
                    </InputAdornment>
                  ),
                  className: 'bg-white',
                }}
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name='password'
            defaultValue=''
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field, fieldState: { invalid, error } }) => (
              <TextField
                {...field}
                fullWidth
                placeholder='Password'
                type='password'
                onKeyPress={onKeyPressPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Lock />
                    </InputAdornment>
                  ),
                  className: 'bg-white',
                }}
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
        </div>

        <div className='flex justify-center'>
          <LoadingButton variant='contained' loading={isLoading} onClick={handleClickLogin}>
            LOGIN
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
