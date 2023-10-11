import {Box, Button, Card, Modal, Typography} from '@mui/material'
import React, { useMemo } from 'react'
import { ControlledCheckbox, ControlledDatePicker } from '..';

interface ICertificationMemoProps {
    active: any;
    onClose: () => void;
}

const CertificationModal = ({active, onClose}:ICertificationMemoProps) => {

    const activeField = useMemo(() => {
        if(!active) return ''
        return `${active.split('.')[0]}.${active.split('.')[1]}`
    },[active])

    return (
        <Modal
            open={active}
            onClose={onClose}
        >
            <Card
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    Felicitaciónes
                </Typography>
                <Typography id="modal-modal-description" variant='h6' sx={{ mt: 1 }}>
                    Es importante verificar la siguiente información
                </Typography>
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        width: '100%',
                        mt: '2rem'
                    }}
                >
                    <ControlledDatePicker
                        shouldUnregister={false}
                        label="Fecha de vencimiento de la certificación"
                        name={`${activeField}.date`}
                    />

                    <ControlledCheckbox
                        shouldUnregister={false}
                        label="Tengo un Scope Certificate validado"
                        name={`${activeField}.scope`}
                    />
                    <Button onClick={onClose} variant='contained'>
                        Listo
                    </Button>
                </Box>
            </Card>
        </Modal>
    )
}

export default CertificationModal