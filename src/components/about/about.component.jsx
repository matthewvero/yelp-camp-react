import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components';
import { ContentContainer } from '../misc/containers.styles';
import { SectionTitle, SubTitle, Text } from '../misc/text.styles';
import { AboutSection } from './about.styles';

const About = ({profileInfo, editable}) => {
      const [editing, setEditing] = useState(false)
      const themeContext = useContext(ThemeContext);
      return (
            <ContentContainer
                  style={{
                        height: "auto",
                        width: "100%",
                        alignItems: "start",
                        padding: "20px",
                        justifyContent: "start",
                        color: themeContext.textAlt,
                        position: 'relative'
                  }}
            >
                  {
                        editable &&
                        <FontAwesomeIcon
                              icon={faEdit} 
                              onClick={() => setEditing(true)}
                              style={{cursor: 'pointer', fontSize: '1.4rem', position: 'absolute', top: '30px', right: '20px'}}
                        />
                  }
                  <div style={{ margin: "10px 0", display: 'flex', alignItems: 'center'}}>
                        <SubTitle style={{ marginRight: '20px', fontSize: '1.5rem', fontWeight: '600' }}>About</SubTitle> 
                        
                  </div>

                  <div
                        style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                              justifyContent: "start",
                              width: "100%",
                              height: "100%",
                        }}
                  >
                        

                        <AboutSection>
                              <SectionTitle>
                                    Joined: 
                              </SectionTitle>
                              <Text>June</Text>
                        </AboutSection>
                        <AboutSection>
                              <SectionTitle>
                                    From: 
                              </SectionTitle>
                              <Text>LA</Text>
                        </AboutSection>
                        <SectionTitle
                              style={{
                                    margin: "5px 0",
                              }}
                        >
                              
                              Bio:
                        </SectionTitle>
                        <div style={{display: 'flex', alignItems: 'start', height: 'auto', minHeight: '50px', width: '100%'}}>
                        {
                              profileInfo.bio ?
                              <Text>bio is here</Text>
                              :
                              <Text style={{margin: '5px'}}>Tell us about yourself</Text>
                        }
                        </div>
                  </div>
            </ContentContainer>
      )
}

export default About;
