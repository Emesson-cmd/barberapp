import React, { useState, useEffect } from "react"
import styled from "styled-components/native"
import { useNavigation } from "@react-navigation/native"

import Api from "../Api"

import ExpandIcon from "../assets/expand.svg"
import NavPrevIcon from "../assets/nav_prev.svg"
import NavNextIcon from "../assets/nav_next.svg"
import { Alert } from "react-native"

const Modal = styled.Modal``;

const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-end;
`;
const ModalBody = styled.View`
    background-color: #83D6E3;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 10px 20px 40px 20px;
`;
const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

const ModalItem = styled.View`
    background-color: #FFFFFF;
    border-radius: 10px;
    margin-top:  15px;
    padding: 10px;
`;
const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;
const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 20px;
    margin-right: 15px;
`;
const UserName = styled.Text`
    font-size: 18px
    color: #000000;
    font-weight: bold;
`;

const ServiceInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
const ServiceName = styled.Text`
    font-weight: bold;
    font-size: 16px;
`;
const ServicePrice = styled.Text`
    font-weight: bold;
    font-size: 16px;
`;

const FinishButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #268596;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 10px;
`;
const FinishButtonText = styled.Text`
    font-size: 17px
    color: #FFFFFF;
    font-weight: bold;
`;

const DateInfo = styled.View`
    flex-direction: row;
`;
const DatePrevArea = styled.TouchableOpacity`
    flex: 1;
    justify-cont: flex-end;
    align-items: flex-end;
`;
const DateTitleArea = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;
`;
const DateTitle = styled.Text`
    font-size: 17px
    color: #000000;
    font-weight: bold;
`;
const DateNextArea = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-start;
`;

const DateItem = styled.TouchableOpacity`
    width: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
`;
const DateItemWeekDay = styled.Text`
    font-size: 17px;
    color: #000000;
    font-weight: bold;
`;
const DateItemNumber = styled.Text`
    font-size: 17px;
    color: #000000;
    font-weight: bold;
`;

const TimeList = styled.ScrollView``;

const TimeItem = styled.TouchableOpacity`
    width: 75px;
    height:40px;
    justify-content: center;
    border-radius: 10px;
    align-items: center;
`;

const TimeItemText = styled.Text`
    font-size: 17px;
    color: #000000;
    font-weight: bold;
`;

const months = [
    "Janeiro",
    "Favereiro",
    "Marços",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
]
const days = [
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sab",
]

const DateList = styled.ScrollView``;

export default ({ show, setShow, user, serviceSelected }) => {
    const navigation = useNavigation()

    const [selectedYear, setSelectedYear] = useState(0)
    const [selectedMonth, setSelectedMonth] = useState(0)
    const [selectedDay, setSelectedDay] = useState(0)
    const [selectedHour, setSelectedHour] = useState(0)
    const [listDays, setListDays] = useState([])
    const [listHours, setListHours] = useState([])



    const handleCloseButton = () => {
        setShow(false)
    }

    const handleFinishClick = async () => {
        if(
            user.id &&
            serviceSelected != null &&
            selectedYear > 0 &&
            selectedMonth > 0 &&
            selectedDay > 0 &&
            selectedHour != null
        ){

            /*let res = await Api.setAppointment(
                user.id,
                serviceSelected,
                selectedYear,
                selectedMonth,
                selectedDay,
                selectedHour
            )

            if ( res.error == ""){
                setShow(false)
                navigation.navigate("Appointments")
            } else {
                Alert.alert("Finalizar Agendamento", 
                "Houve um erro ao finalizar o agendamento: " + res.error)
            }*/
            setShow(false)
            navigation.navigate("Appointments")
        } else {
            Alert.alert("Finalizar Agendamento", "Preencha todos os dados")
        }
    }

    const handleLeftDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1)
        mountDate.setMonth( mountDate.getMonth() - 1 )
        setSelectedYear( mountDate.getFullYear() )
        setSelectedMonth( mountDate.getMonth() )
        setSelectedDay(0)
        setListHours([])
    }

    const handleRightDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1)
        mountDate.setMonth( mountDate.getMonth() + 1 )
        setSelectedYear( mountDate.getFullYear() )
        setSelectedMonth( mountDate.getMonth() )
        setSelectedDay(0)
        setListHours([])
    }

    /** Quando abrir esta modal as informações das datas atuais serão setada para o momento atual */
    useEffect(()=>{
        let today = new Date();
        setSelectedYear( today.getFullYear() ) 
        setSelectedMonth( today.getMonth() )
        setSelectedDay( today.getDate() )
        setListHours([])
    },[])

    /** Monta lista de dias de acordo com o mês e ano selecionado */
    useEffect(()=>{
        if(user.available){
            /** Pega o ultimo dia do mês */
            let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate()
            let newListDays = []

            /**
             * Monta um array com todos o dias de um determinado mês.
             * Verifica se cada dia tem o status de disponível ou não para agendamento
             * Além de colocar o dia (ex.: 23), ainda coloca o nome do dia (ex.: seg)
             */
            for(let i=1; i<=daysInMonth; i++){
                let d = new Date(selectedYear, selectedMonth, i)
                let year = d.getFullYear()
                let month = d.getMonth() + 1
                let day = d.getDate()
                month = month < 10 ? '0'+month : month
                day = day < 10 ? '0'+day : day
                let selDate = year+"-"+month+"-"+day

                let availability = user.available.filter(e=>e.date === selDate)
                
                newListDays.push({
                    status: availability.length > 0 ? true : false,
                    weekday: days[ d.getDay() ], 
                    number: i
                })
            }

            setListDays(newListDays)
            setSelectedDay(0)
            setListHours([])
            setSelectedHour(0)
        }
    },[user, selectedMonth, selectedYear])

    /** 
     * Monta um array com todos os horários disponíveis do barbeiro de acordo com a
     * data selecionada
     */
    useEffect(()=>{
        if(user.available && selectedDay > 0){
            let d = new Date(selectedYear, selectedMonth, selectedDay)
            let year = d.getFullYear()
            let month = d.getMonth() + 1
            let day = d.getDate()
            month = month < 10 ? '0'+month : month
            day = day < 10 ? '0'+day : day
            let selDate = year+"-"+month+"-"+day

            let availability = user.available.filter(e=>e.date === selDate)

            console.log("availability", availability)
            if(availability.length > 0){
                setListHours( availability[0].hours )
            }
        }
        setSelectedHour(null)
    },[user, selectedDay])

    return(
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={handleCloseButton}>
                        <ExpandIcon width="40" height="40" file="#000000" />
                    </CloseButton>

                    <ModalItem>
                        <UserInfo>
                            <UserAvatar source={{uri: user.avatar}} />
                            <UserName>{user.name}</UserName>
                        </UserInfo>
                    </ModalItem>

                    {serviceSelected != null &&
                        <ModalItem>
                            <ServiceInfo>
                                <ServiceName>{user.services[serviceSelected].name}</ServiceName>
                                <ServicePrice>R$ {user.services[serviceSelected].price.toFixed(2)}</ServicePrice>
                            </ServiceInfo>
                        </ModalItem>
                    }

                    <ModalItem>
                        <DateInfo>
                            <DatePrevArea onPress={handleLeftDateClick}>
                                <NavPrevIcon width="35" height="35" fill="#000000" />
                            </DatePrevArea>
                            <DateTitleArea>
                                <DateTitle>{months[selectedMonth]} {selectedYear}</DateTitle>
                            </DateTitleArea>
                            <DateNextArea onPress={handleRightDateClick}>
                                <NavNextIcon width="35" height="35" fill="#000000" />
                            </DateNextArea>
                        </DateInfo>

                        <DateList horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                listDays.map((item, key)=>(
                                    <DateItem 
                                        key={key}
                                        onPress={()=>{
                                            item.status ? setSelectedDay(item.number) : null
                                        }}
                                        style={{
                                            opacity: item.status ? 1 : 0.5,
                                            backgroundColor: item.number === selectedDay ? "#4EADBE" : "#FFFFFF"
                                        }}
                                    >
                                        <DateItemWeekDay
                                            style={{
                                                color: item.number === selectedDay ? "#FFFFFF" : "#000000",
                                            }}
                                        >{item.weekday}</DateItemWeekDay>
                                        <DateItemNumber
                                            style={{
                                                color: item.number === selectedDay ? "#FFFFFF" : "#000000",
                                            }}
                                        >{item.number}</DateItemNumber>
                                    </DateItem>
                                ))
                            }
                        </DateList>
                    </ModalItem>
                    
                    {selectedDay > 0 && listHours.length > 0 &&
                        <ModalItem>
                            <TimeList horizontal={true} showsHorizontalScrollIndicator={false} >
                                {
                                    listHours.map((item, key)=>(
                                        <TimeItem
                                            key={key}
                                            onPress={()=>{setSelectedHour(item)}}
                                            style={{
                                                backgroundColor: selectedHour === item ? "#4EADBE" : "#FFFFFF",
                                            }}
                                        >
                                            <TimeItemText
                                                style={{
                                                    color: item === selectedHour ? "#FFFFFF" : "#000000",
                                                }}
                                            >{item}</TimeItemText>
                                        </TimeItem>
                                    ))
                                }
                            </TimeList>
                        </ModalItem>
                    }

                    <FinishButton onPress={handleFinishClick}>
                        <FinishButtonText>Finalizar Agendamento {selectedDay}</FinishButtonText>
                    </FinishButton>

                </ModalBody>
            </ModalArea>
        </Modal>
    )
}