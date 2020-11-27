import { faChevronDown, faChevronLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components';
import { CollapsibleContainer, CollapsibleContainerIcon, CollapsibleContainerTitleBar, ContentContainer } from '../misc/containers.styles';
import { SectionTitle, SubTitle, Text } from '../misc/text.styles';
import { AboutSection } from './about.styles';

const About = ({profileInfo, editable}) => {
      const [editing, setEditing] = useState(false)
      const themeContext = useContext(ThemeContext);
      const [collapsed, setCollapsed] = useState(window.matchMedia(`(max-width: ${themeContext.smallBreakPoint})`).matches)

      useEffect(() => {
            const windowSize = window.matchMedia(`(max-width: ${themeContext.smallBreakPoint})`);
            const handleChange = e => {
                  if(e.matches) {
                        setCollapsed(true);
                  } else {
                        setCollapsed(false);
                  }
            }
            windowSize.addEventListener('change', handleChange);
            return () => {
                  windowSize.removeEventListener('change', handleChange);
            }
      }, [])

      return (
            <CollapsibleContainer
                  style={{
                        width: "100%",
                        alignItems: "start",
                        padding: "20px",
                        justifyContent: "start",
                        color: themeContext.textAlt,
                        position: 'relative'
                  }}
                  collapsed={collapsed}
            >
                  
                  <CollapsibleContainerTitleBar onClick={() => setCollapsed(collapsed => !collapsed)}>
                        <SubTitle style={{ marginRight: '20px', fontSize: '1.5rem', fontWeight: '600' }}>About</SubTitle> 
                        <CollapsibleContainerIcon icon={faChevronDown} collapsed={collapsed} />
                  </CollapsibleContainerTitleBar>

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
            </CollapsibleContainer>
      )
}

export default About;
