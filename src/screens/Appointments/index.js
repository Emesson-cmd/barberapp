import React from 'react'
import { Text } from 'react-native'
import { 
    Container,
    Scroller,
    Title,

    AppointmentItem,
    AppointmentBarber,
    BarberAvatar,
    BarberName,
    AppointmentService,
    ServiceName,
    ServicePrice,
    AppointmentInfo,
    AppointmentDate,
    AppointmentTime,
 } from './styles'

export default () => {
    const barber = [
        {
           "avatar":"https://api.b7web.com.br/devbarber/media/avatars/2.png",
           "distance":0.691000000000108,
           "id":5,
           "latitude":"-23.5530907",
           "longitude":"-46.6682795",
           "name":"Pedro Diniz",
           "stars":4.5
        },
        {
           "avatar":"https://api.b7web.com.br/devbarber/media/avatars/3.png",
           "distance":0.691000000000108,
           "id":7,
           "latitude":"-23.5730907",
           "longitude":"-46.6682795",
           "name":"Ronaldo Sousa",
           "stars":2.9
        },
        {
           "avatar":"https://api.b7web.com.br/devbarber/media/avatars/3.png",
           "distance":1.4430774243756335,
           "id":9,
           "latitude":"-23.5530907",
           "longitude":"-46.6482795",
           "name":"Leticia Diniz",
           "stars":3.3
        },
        {
           "avatar":"https://api.b7web.com.br/devbarber/media/avatars/4.png",
           "distance":1.5201936184696858,
           "id":8,
           "latitude":"-23.5830907",
           "longitude":"-46.6582795",
           "name":"Ronaldo Gomes",
           "stars":2.1
        },
        {
           "avatar":"https://api.b7web.com.br/devbarber/media/avatars/3.png",
           "distance":1.9001792731522114,
           "id":2,
           "latitude":"-23.5630907",
           "longitude":"-46.6982795",
           "name":"Amanda Sousa",
           "stars":4.7
        }
     ]

    const services = [{
        "available":[
           {
              "date":"2022-08-28",
              "hours":[
                 "Array"
              ]
           },
           {
              "date":"2022-08-29",
              "hours":[
                 "Array"
              ]
           },
           {
              "date":"2022-08-30",
              "hours":[
                 "Array"
              ]
           },
           {
              "date":"2022-08-31",
              "hours":[
                 "Array"
              ]
           },
           {
              "date":"2022-09-04",
              "hours":[
                 "Array"
              ]
           },
           {
              "date":"2022-09-05",
              "hours":[
                 "Array"
              ]
           },
           {
              "date":"2022-09-06",
              "hours":[
                 "Array"
              ]
           },
           {
              "date":"2022-09-07",
              "hours":[
                 "Array"
              ]
           },
           {
              "date":"2022-09-11",
              "hours":[
                 "Array"
              ]
           },
           {
              "date":"2022-09-12",
              "hours":[
                 "Array"
              ]
           },
           {
              "date":"2022-09-13",
              "hours":[
                 "Array"
              ]
           },
           {
              "date":"2022-09-14",
              "hours":[
                 "Array"
              ]
           }
        ],
        "avatar":"https://api.b7web.com.br/devbarber/media/avatars/2.png",
        "favorited":false,
        "id":5,
        "latitude":"-23.5530907",
        "longitude":"-46.6682795",
        "name":"Pedro Diniz",
        "photos":[
           {
              "id":17,
              "url":"https://api.b7web.com.br/devbarber/media/uploads/2.png"
           },
           {
              "id":18,
              "url":"https://api.b7web.com.br/devbarber/media/uploads/1.png"
           },
           {
              "id":19,
              "url":"https://api.b7web.com.br/devbarber/media/uploads/3.png"
           },
           {
              "id":20,
              "url":"https://api.b7web.com.br/devbarber/media/uploads/4.png"
           }
        ],
        "services":[
           {
              "id":18,
              "name":"Aparação de Sobrancelhas",
              "price":10.21
           },
           {
              "id":19,
              "name":"Aparação de Unha",
              "price":92.8
           },
           {
              "id":20,
              "name":"Enfeite de Cabelo",
              "price":82.54
           },
           {
              "id":21,
              "name":"Enfeite de Unha",
              "price":92.14
           }
        ],
        "stars":4.5,
        "testimonials":[
           {
              "body":"Fusce malesuada justo in maximus auctor. In quis enim in.",
              "id":13,
              "name":"Pedro Diniz",
              "rate":2.9
           },
           {
              "body":"Maecenas ullamcorper mi a justo egestas ultrices quis eget lacus.",
              "id":14,
              "name":"Bonieky Silva",
              "rate":3.3
           },
           {
              "body":"Fusce malesuada justo in maximus auctor. In quis enim in.",
              "id":15,
              "name":"Paulo Alvaro",
              "rate":4.3
           }
        ]
    }]


    return (
        <Container>
            <Scroller>
                <Title>Atendimentos</Title>

                {
                    barber.map((item, key) => {
                        return(
                            <AppointmentItem
                                key={key}
                                style={{
                                    opacity: key == 0 ? 1 : 0.4
                                }}
                            >
                                <AppointmentBarber>
                                    <BarberAvatar source={{uri: item.avatar}} />
                                    <BarberName>{item.name}</BarberName>
                                </AppointmentBarber>
                
                                <AppointmentService>
                                    <ServiceName>{services[0].services[0].name}</ServiceName>
                                    <ServicePrice>{services[0].services[0].price}</ServicePrice>
                                </AppointmentService>
                
                                <AppointmentInfo>
                                    <AppointmentDate>{services[0].available[0].date}</AppointmentDate>
                                    <AppointmentTime>13:00</AppointmentTime>
                                </AppointmentInfo>
                            </AppointmentItem>
                        )
                    })
                }
            </Scroller>
        </Container>
    )
}