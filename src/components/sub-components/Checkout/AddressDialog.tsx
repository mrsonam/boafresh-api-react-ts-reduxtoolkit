import { useState } from 'react';
import { useGetSingleProductQuery } from '../../../services/products';
import {
    Box,
    Card,
    CardMedia,
    Typography,
    CardContent,
    Button,
    Stack,
    Skeleton,
    ButtonGroup,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    Divider,
    IconButton,
    FormControl,
    TextField,
    InputAdornment,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import {
    AddLocationAltOutlined,
    CloseOutlined,
    MapOutlined,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useAddAddressMutation } from '../../../services/delivery';
import { useForm } from 'react-hook-form';

const useStyle = makeStyles({
    dialog: {
        width: '100%',
        height: '100%',
        borderRadius: '20px',
    },
    addressCard: {
        display: 'flex',
        background: 'transparent',
        boxShadow: 'none',
    },
    main: {
        maxWidth: '100vw',
    },
    products: {
        margin: '30px',
    },
    cardImg: {
        height: 'auto',
        width: '50%',
        borderRadius: '20px',
    },
});

interface CartDialogProps {
    open: boolean;
    closeDialog: () => void;
}

const AddressDialog = ({ open, closeDialog }: CartDialogProps) => {
    const classes = useStyle();

    const defaultInput = {
        title: '',
        latitude: '',
        longitude: '',
        isDefault: false,
    };
    const [input, setInput] = useState(defaultInput);

    console.log(input);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [openAlert, setOpenAlert] = useState(true);

    const [addAddress, responseInfo] = useAddAddressMutation();

    return (
        <Dialog onClose={closeDialog} open={open} className={classes.dialog}>
            <IconButton
                aria-label="close"
                onClick={closeDialog}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseOutlined />
            </IconButton>
            <DialogTitle>Add To Cart</DialogTitle>
            <Divider />
            <Box component="main" className={classes.main}>
                <Box className={classes.products}>
                    <form
                        className={classes.addressCard}
                        onSubmit={handleSubmit(() => {
                            addAddress(input);
                            setOpenAlert(true);
                            // setInput(defaultInput);
                        })}
                    >
                        <Stack spacing={2}>
                            <TextField
                                {...register('title', {
                                    required: 'Title cannot be empty',
                                })}
                                type="text"
                                label="Location Title"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AddLocationAltOutlined />
                                        </InputAdornment>
                                    ),
                                }}
                                value={input.title}
                                onChange={(e) =>
                                    setInput({
                                        ...input,
                                        title: e.target.value,
                                    })
                                }
                            />
                            <Typography color={'error'} variant="subtitle2">
                                {errors.title?.message}
                            </Typography>
                            <TextField
                                {...register('latitude', {
                                    required: 'Latitude cannot be empty',
                                    max: {
                                        value: 30.27,
                                        message:
                                            'Longitude cannot be more than 30.27',
                                    },
                                    min: {
                                        value: 26.22,
                                        message:
                                            'Longitude cannot be less than 26.22',
                                    },
                                })}
                                type="number"
                                label="Latitude"
                                variant="outlined"
                                // InputProps={{ inputProps: { min: 26.22, max: 30.27 } }}
                                value={input.latitude}
                                helperText="Latitude must be between 26.22 to 30.27"
                                onChange={(e) =>
                                    setInput({
                                        ...input,
                                        latitude: e.target.value,
                                    })
                                }
                            />
                            <Typography color={'error'} variant="subtitle2">
                                {errors.latitude?.message}
                            </Typography>
                            <TextField
                                {...register('longitude', {
                                    required: 'Longitude cannot be empty',
                                    max: {
                                        value: 88.12,
                                        message:
                                            'Longitude cannot be more than 88.12',
                                    },
                                    min: {
                                        value: 80.4,
                                        message:
                                            'Longitude cannot be less than 80.4',
                                    },
                                })}
                                type="number"
                                label="Longitude"
                                variant="outlined"
                                // InputProps={{ inputProps: { min: 80.4, max: 88.12 } }}
                                value={input.longitude}
                                helperText="Longitude must be between 80.4 to 88.12"
                                onChange={(e) =>
                                    setInput({
                                        ...input,
                                        longitude: e.target.value,
                                    })
                                }
                            />
                            <Typography color={'error'} variant="subtitle2">
                                {errors.longitude?.message}
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        style={{
                                            padding: 0,
                                            marginRight: 5,
                                        }}
                                        onChange={(e) => {
                                            setInput({
                                                ...input,
                                                isDefault: e.target.checked,
                                            });
                                        }}
                                    />
                                }
                                label="Set Default"
                            />
                            <Button type="submit" variant="contained">
                                Add Address
                            </Button>
                        </Stack>
                    </form>
                    {responseInfo.isSuccess ? (
                        <Snackbar
                            open={openAlert}
                            autoHideDuration={2000}
                            onClose={() => setOpenAlert(false)}
                        >
                            <Alert
                                severity="success"
                                sx={{ width: '100%' }}
                                onClose={() => setOpenAlert(false)}
                            >
                                Address Added Successfuly
                            </Alert>
                        </Snackbar>
                    ) : responseInfo.isError ? (
                        <Snackbar
                            open={openAlert}
                            autoHideDuration={2000}
                            onClose={() => setOpenAlert(false)}
                        >
                            <Alert
                                severity="error"
                                sx={{ width: '100%' }}
                                onClose={() => setOpenAlert(false)}
                            >
                                The location you chose is outside Nepal.
                            </Alert>
                        </Snackbar>
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
        </Dialog>
    );
};

export default AddressDialog;
